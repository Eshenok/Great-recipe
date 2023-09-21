/* Испорты */
const usersRouter = require('express').Router();
const {
  getCurrentUser, updateCurrentUser, updateFridge
} = require('../controllers/users');

/* Роуты */
usersRouter.get('/me', getCurrentUser);
usersRouter.patch('/me', updateCurrentUser);
usersRouter.patch('/fridge', updateFridge);

/* Экспорты */
module.exports = usersRouter;
