/* Ошибка */
const Unauthorized = require('../errors/Unauthorized');
/* env */
require('dotenv').config();

module.exports = (req, res, next) => {
  if (req.session.userId) {
    next();
  } else {
    next(new Unauthorized('Unauthorized'));
  }
};
