const recipesRouter = require('express').Router();
const { addRecipeToFavorite, getRecipeForId, removeRecipeFromFavorite, refreshFetchedRecipes } = require('../controllers/recipes.js');
const { getRandomRecipes, findRecipesByIngredients, putRating } = require("../controllers/recipes");

recipesRouter.post('/find/:recipeId', getRecipeForId);
recipesRouter.post('/add/:recipeId', addRecipeToFavorite);
recipesRouter.post('/remove/:recipeId', removeRecipeFromFavorite);
recipesRouter.post('/find', findRecipesByIngredients);
recipesRouter.get('/rnd', getRandomRecipes);
recipesRouter.get('/refresh', refreshFetchedRecipes);
recipesRouter.put('/rate', putRating);

module.exports = recipesRouter;
