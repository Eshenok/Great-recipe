/* Импорты */
const jwt = require('jsonwebtoken'); // Пакет для создания jwt
const User = require('../models/user');
/* Ошибка */
const Unauthorized = require('../errors/Unauthorized');
/* env */
require('dotenv').config();
// обращение к файлу .env
const { NODE_ENV, JWT_SECRET } = process.env;
const { devSecurityKey } = require('./constants');
const NotFound = require("../errors/NotFound");

module.exports = (req, res, next) => {
  // if (req.session.userData) {
  //  req.user = req.session["userData"]["userObj"];
  //  next();
  // } else
  //   if (req.headers.authorization) {
  //   const token = req.headers.authorization.replace('Bearer ', '');
  //
  //   let payload;
  //   try {
  //     payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : devSecurityKey); // верифицируем токен
  //   } catch (err) {
  //     next(new Unauthorized('Необходимо авторизоваться')); // не получилось -> ошибка
  //     return;
  //   }
  //
  //   req.user = payload; // записываем пейлод в юзера
  //   next(); // пропускаем дальше
  // } else {
  //   next(new Unauthorized('Необходимо авторизоваться')); // не получилось -> ошибка
  //   return;
  // }
  if (req.session.userId) {
    next()
  } else {
    next(new Unauthorized('Unauthorized'))
  }

};
