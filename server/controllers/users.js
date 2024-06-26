/*imports*/
const bcrypt = require('bcryptjs');
const User = require('../models/user');
/*errors*/
const NotFound = require('../errors/NotFound');
const BadRequest = require('../errors/BadRequest');
const Conflict = require('../errors/Conflict');

module.exports.updateFridge = (req, res, next) => {
  const fridgeFromClient = req.body.fridge;
  if (!req.body.fridge) throw new BadRequest('Not data to update');

  const user = User.findByIdAndUpdate(req.session.userId, {fridge: fridgeFromClient}, { new: true, runValidators: true })
    .orFail(() => {
      throw new NotFound('User not found');
    })
    .then((user) => {
      res.send(user);
    })
    .catch(next);
}

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.session.userId)
    .orFail(() => {
      throw new NotFound('User not found');
    })
    .then((user) => {
      res.send(user)
    })
    .catch(next);
};

module.exports.updateCurrentUser = (req, res, next) => {
  const { name, email } = req.body;

  User.findByIdAndUpdate(req.session.userId, { name, email }, { new: true, runValidators: true })
    .orFail(() => {
      throw new NotFound('User not found');
    })
    .then((user) => res.send(user))
    /*if user find but have errors*/
    .catch((err) => {
      if (err.code === 11000) {
        next(new Conflict());
      } else if (err.name === 'CastError' || err.name === 'ValidationError') {
        next(new BadRequest());
      } else {
        next(err);
      }
    });
};

module.exports.createUser = (req, res, next) => {
  const { name, email, password } = req.body;
  
  bcrypt.hash(password, 10) // password hash
    .then((hash) => User.create({ // if "ok" - create user
      email,
      password: hash,
      name,
    }))
    .then((user) => {
      // change JSON => JS Obj, remove password and send res
      const userObj = user.toObject();
      delete userObj.password;
      if (email === password) {
        res.status(267);
      } else {
        res.status(201);
      }
      res.send(userObj);
    })
    .catch((err) => {
      if (err.code === 11000) {
        console.log(err);
        next(new Conflict('User already created'));
      } else if (err.name === 'CastError' || err.name === 'ValidationError') {
        next(new BadRequest());
      } else {
        next(err);
      }
    });
};

module.exports.signin = (req, res, next) => {
  const { password, email } = req.body;

  User.findUserByCredentials(email, password) // custom method
    .then((user) => {
      const userObj = user.toObject();
      delete userObj.password;
      req.session.userId = user._id;
      req.session.fetchedRecipes = [];
      req.session.ingridientsRecipes = [];
      res.send({ userObj });
    })
    .catch(next);
};
