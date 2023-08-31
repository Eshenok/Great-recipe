/* Испорты */
const usersRouter = require('express').Router();
const {
  getCurrentUser, updateCurrentUser, getFavouriteRecipes
} = require('../controllers/users');

/* Роуты */
usersRouter.get('/me', getCurrentUser);
usersRouter.patch('/me', updateCurrentUser);
usersRouter.get('/me/saved', getFavouriteRecipes);

/* Экспорты */
module.exports = usersRouter;
