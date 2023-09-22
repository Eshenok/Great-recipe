const recipesRouter = require('express').Router();
const { addRecipeToFavorite, getRecipeForId, removeRecipeFromFavorite } = require('../controllers/recipes.js');
const { getRandomRecipes, findRecipesByIngredients, putRating } = require("../controllers/recipes");

recipesRouter.post('/find/:recipeId', getRecipeForId);
recipesRouter.post('/add/:recipeId', addRecipeToFavorite);
recipesRouter.post('/remove/:recipeId', removeRecipeFromFavorite);
recipesRouter.post('/find', findRecipesByIngredients);
recipesRouter.get('/rnd', getRandomRecipes);
recipesRouter.put('/rate', putRating);

module.exports = recipesRouter;
