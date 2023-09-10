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
const { log } = require("winston");

// const alreadyFetchedRecipes = [];
//
// module.exports.getRandomRecipes = async (req, res, next) => {
//   try {
//     let { quantity = 50 } = req.params;
//
//     const remainingRecipes = await Recipe.find({ _id: { $nin: alreadyFetchedRecipes } });
//   } catch (err) {
//     next(err);
//   }
//
// }

module.exports.removeRecipeFromFavourite = async (req, res, next) => {
  try {
    const recipeId = req.params.recipeId;
    if (!recipeId) {
      throw new BadRequest('ID рецепта обязательный параметр');
    }

    const recipe = await Recipe.findById(recipeId);
    if (!recipe) throw new NotFound('Рецепт не найден');

    const result = await User.updateOne({ _id: req.user._id }, { $pull: { favourite: recipe._id } });

    if (result.modifiedCount === 0) {
      return res.status(200).json({ message: 'Рецепта нет в избранном' });
    }

    return res.status(200).json({message: 'Рецепт успешно удален'});
  } catch (err) {
    next(err);
  }
}

module.exports.addRecipeToFavourite = async (req, res, next) => {
  try {
    /*Get recipeId*/
    const recipeId = req.params.recipeId;
    if (!recipeId) {
      throw new BadRequest('ID рецепта обязательный параметр');
    }

    /*find recipe*/
    const recipe = await Recipe.findById(recipeId);
    if (!recipe) throw new NotFound('Рецепт не найден');

    /*find user after auth*/
    const updatedUser = await User.findById(req.user._id);
    if (!updatedUser) throw new NotFound('Пользователь не найден');

    /*check includes*/
    if (!updatedUser.favourite.includes(recipe._id)) {
      updatedUser.favourite.push(recipe._id);
      await updatedUser.save();
    } else {
      return res.status(200).json({message: 'Рецепт уже в избранном'});
    }

    return res.status(200).json({message: 'Рецепт успешно добавлен'})
  } catch (err) {
    next(err);
  }
}


module.exports.getRecipeForId = async (req, res, next) => {
  try {
    const recipeId = req.params.recipeId;
    if (!recipeId) {
      throw new BadRequest('ID рецепта обязательный параметр');
    }
    const recipe = await Recipe.findById(recipeId);
    if (!recipe) {
      throw new NotFound('Рецепт не найден');
    }
    return res.send(recipe);
  } catch (err) {
    console.log(err);
    next(err);
  }
}
