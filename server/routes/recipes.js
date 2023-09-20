const recipesRouter = require('express').Router();
const { addRecipeToFavourite, getRecipeForId, removeRecipeFromFavourite } = require('../controllers/recipes.js');
const { getRandomRecipes, findRecipesByIngredients } = require("../controllers/recipes");

recipesRouter.post('/find/:recipeId', getRecipeForId);
recipesRouter.post('/add/:recipeId', addRecipeToFavourite);
recipesRouter.post('/remove/:recipeId', removeRecipeFromFavourite);
recipesRouter.post('/find', findRecipesByIngredients);
recipesRouter.get('/rnd', getRandomRecipes);

module.exports = recipesRouter;
