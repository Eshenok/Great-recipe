const recipesRouter = require('express').Router();
const { addRecipeToFavourite } = require('../controllers/recipes.js');

recipesRouter.post('/add/:recipeId', addRecipeToFavourite);

module.exports = recipesRouter;
