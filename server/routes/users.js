/* Испорты */
const usersRouter = require('express').Router();
const {
  getCurrentUser, updateCurrentUser, updateFridge,
  signout,
  updatePassCurrentUser
} = require('../controllers/users');

/* Роуты */
usersRouter.get('/me', getCurrentUser);
usersRouter.patch('/me', updateCurrentUser);
usersRouter.patch('/me/pass', updatePassCurrentUser);
usersRouter.patch('/fridge', updateFridge);
usersRouter.get('/signout', signout);

/* Экспорты */
module.exports = usersRouter;
