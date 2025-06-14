/*imports*/
const bcrypt = require('bcryptjs');
const User = require('../models/user');
/*errors*/
const NotFound = require('../errors/NotFound');
const BadRequest = require('../errors/BadRequest');
const Conflict = require('../errors/Conflict');
const Unauthorized = require('../errors/Unauthorized');
const { NODE_ENV } = process.env; // Забираем из .env


// Обнволение продуктов в холодильнике
// Принимает Array всех продуктов с фронта и перезаписывает поле целиком
module.exports.updateFridge = (req, res, next) => {
  const fridgeFromClient = req.body.fridge;
  if (!req.body.fridge) throw new BadRequest('Not data to update');

  User.findByIdAndUpdate(req.session.userId, {fridge: fridgeFromClient}, { new: true, runValidators: true })
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

/*  
 * Обновление пользователя
 * Принимает 4 поля, но фильтрует что именно надо изменить по приниципу:
 * Все что не совпадает с текущим -> изменить
*/
module.exports.updateCurrentUser = async (req, res, next) => {
  try {
    const { password, email, newName, newEmail } = req.body;

    if (!password || !email) {
      throw new Unauthorized();
    }

  let unqueNewEmail = true;
  const user = await User.findUserByCredentials(email, password) // custom method

  if (!user) throw new NotFound('User not Found');

  if (newEmail !== email) {
    const checkNewEmail = await User.findOne({email: newEmail});
    if (checkNewEmail) {
      unqueNewEmail = false;
      throw new Conflict('User already have this email')
    }
  }

  const updatedData = {
    name: newName
  };
  if (unqueNewEmail) {
    updatedData.email = newEmail;
  }

  console.log(updatedData);

  const updatedUser = await User.findByIdAndUpdate(user._id, updatedData, {new: true});
  res.send(updatedUser);
  } catch (err) {
    next(err)
  }
};

module.exports.updatePassCurrentUser = async (req, res, next) => {
  try {
    const {email, oldPassword, newPassword} = req.body;
    if ((!email || !oldPassword || !newPassword) || (oldPassword === newPassword)) throw new BadRequest('Uncorrect data');

    const findedUser = await User.findUserByCredentials(email, oldPassword);
    if (!findedUser) throw new NotFound('Bad Credentials');

    const hashPass = await bcrypt.hash(newPassword, 10);
    console.log(hashPass);
    const updatedData = {password: hashPass};
    const updatedUser = await User.findByIdAndUpdate(findedUser._id, updatedData, {new: true});
    console.log(updatedUser);
    res.send(updatedUser);
  } catch (err) {
    next(err);
  }
}


// Создание пользователя
// Пароль сразу хэшируется, пользователю это поле вообще не приходит
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


/* 
 * Вход пользователя:
 * Принимает почту + пароль, затем ищет в базе совпадение через кастомный метод
 * Метод возвращает поле пароля, поэтому его едаляем вручную
*/
module.exports.signin = (req, res, next) => {
  const { password, email } = req.body;

  User.findUserByCredentials(email, password) // custom method
    .then((user) => {
      const userObj = user.toObject();
      delete userObj.password;
      req.session.userId = user._id;
      req.session.fetchedRecipes = [];
      req.session.ingridientsRecipes = [];
      res.send(userObj);
    })
    .catch((err) => {
      next(new NotFound('bad credentials'))
    });
};

// Выход юзера, ничего передовать не надо, идет поиск по сессии
module.exports.signout = (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      return next(err);
    }
    res.clearCookie('connect.sid', {
      path: '/',
      httpOnly: true,
      secure: NODE_ENV === 'production', // true if in production
      sameSite: NODE_ENV === 'production' ? 'none' : 'lax',
    });
    res.status(200).send({ message: 'Successfully signed out' });
  });
};