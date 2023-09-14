const recipesRouter = require('express').Router();
const { addRecipeToFavourite, getRecipeForId, removeRecipeFromFavourite } = require('../controllers/recipes.js');
const { getRandomRecipes } = require("../controllers/recipes");

recipesRouter.post('/:recipeId', getRecipeForId);
recipesRouter.post('/add/:recipeId', addRecipeToFavourite);
recipesRouter.post('/remove/:recipeId', removeRecipeFromFavourite);
recipesRouter.get('/rnd', getRandomRecipes);

module.exports = recipesRouter;
