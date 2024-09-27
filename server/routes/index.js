/* Импорты */
const router = require('express').Router();
const auth = require('../middlewares/auth');
const { signin, createUser, signout } = require('../controllers/users');
const {getRandomRecipes, findRecipesByIngredients, getRecipeForId} = require("../controllers/recipes");
const usersRouter = require('./users');
const recipesRouter = require('./recipes');

router.post('/signin', signin);
router.post('/signup', createUser);
router.post('/recipes/rnd', getRandomRecipes);
router.post('/recipes/find', findRecipesByIngredients);
router.post('/recipes/find/:recipeId', getRecipeForId);

router.use(auth);

router.use('/recipes', recipesRouter);
router.use('/users', usersRouter);

module.exports = router;
