/*imports*/
const Recipe = require('../models/recipe');
const User = require('../models/user');
/*errors*/
const NotFound = require('../errors/NotFound');
const BadRequest = require('../errors/BadRequest');
const Conflict = require('../errors/Conflict');
/*env*/
require('dotenv').config();
const { NODE_ENV, JWT_SECRET } = process.env;
const { devSecurityKey } = require("../middlewares/constants");

module.exports.addRecipeToFavourite = async (req, res, next) => {
  try {
    const recipeId = req.params.recipeId;
    if (!recipeId) {
      throw new BadRequest('ID рецепта обязательный параметр');
    }

    const user = await User.findById(req.user._id);
    const recipe = await Recipe.findById(recipeId);

    if(!user) {
      throw new NotFound('Пользоваль не найден');
    }

    if(!recipe) {
      throw new NotFound('Рецепт не найден');
    }

    if (!user.favourite.includes(recipeId)) {
      user.favourite.push(recipeId);
      await user.save();
    } else {
      throw new Conflict('Рецепт уже в избранном')
    }

    return res.status(200).json({message: 'Recipe added to favourites'});

  } catch (err) {
    console.log(err);
    next(err);
  }
}
