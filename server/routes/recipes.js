const recipesRouter = require('express').Router();
const { addRecipeToFavourite, getRecipeForId, removeRecipeFromFavourite } = require('../controllers/recipes.js');

recipesRouter.get('/:recipeId', getRecipeForId);
recipesRouter.post('/add/:recipeId', addRecipeToFavourite);
recipesRouter.post('/remove/:recipeId', removeRecipeFromFavourite);

module.exports = recipesRouter;
