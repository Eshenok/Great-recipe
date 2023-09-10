/* Импорты */
const router = require('express').Router();
const auth = require('../middlewares/auth');
const { signin, createUser, signout } = require('../controllers/users');
const usersRouter = require('./users');
const recipesRouter = require('./recipes');

router.post('/signin', signin);
router.post('/signup', createUser);

router.use(auth);

router.use('/recipes', recipesRouter);
router.use('/users', usersRouter);

module.exports = router;
