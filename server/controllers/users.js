/*imports*/
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); // Пакет для создания jwt
const Recipe = require('../models/recipe');
const User = require('../models/user');
/*errors*/
const NotFound = require('../errors/NotFound');
const BadRequest = require('../errors/BadRequest');
const Conflict = require('../errors/Conflict');
/*env*/
require('dotenv').config();
const { NODE_ENV, JWT_SECRET } = process.env;
const { devSecurityKey } = require("../middlewares/constants");

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
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

  User.findByIdAndUpdate(req.user._id, { name, email }, { new: true, runValidators: true })
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
      res.send(userObj);
    })
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

module.exports.signin = (req, res, next) => {
  const { password, email } = req.body;

  User.findUserByCredentials(email, password) // custom method
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : devSecurityKey, { expiresIn: '3d' }); // create token
      // change JSON => JS Obj, remove password and send res
      const userObj = user.toObject();
      delete userObj.password;
      res.send({ userObj, 'jwt': token });
    })
    .catch(next);
};

module.exports.getFavouriteRecipes = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).populate('favourite');
    if (!user) {
      throw new NotFound('Пользователь не найден');
    }

    if(user.favourite.length === 0 || !user.favourite) {
      throw new BadRequest('Нет сохраненных рецептов');
    }

    return res.status(200).json({ favouriteRecipes: user.favourite });
  } catch (err) {
    next(err);
  }

}
