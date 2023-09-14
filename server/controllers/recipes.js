/*imports*/
const Recipe = require('../models/recipe');
const User = require('../models/user');
/*errors*/
const NotFound = require('../errors/NotFound');
const BadRequest = require('../errors/BadRequest');
const { log } = require("winston");

module.exports.getRandomRecipes = async (req, res, next) => {
  try {
    const batchSize = 50; // Размер каждой порции рецептов

    // Проверяем, есть ли еще рецепты, которые не были включены в предыдущие запросы
    const remainingRecipes = await Recipe.find({ _id: { $nin: req.session.fetchedRecipes } });

    if (remainingRecipes.length === 0) {
      return res.status(200).json({message: 'Already all recipes fetched'});
    }

    // Если осталось меньше, чем batchSize рецептов, возвращаем все остатки
    const selectedRecipes = remainingRecipes.slice(0, Math.min(batchSize, remainingRecipes.length));

    // Добавляем выбранные рецепты в массив уже полученных
    selectedRecipes.forEach(recipe => req.session.fetchedRecipes.push(recipe._id));

    return res.status(200).json({ recipes: selectedRecipes });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'An error occurred' });
  }
}

module.exports.removeRecipeFromFavourite = async (req, res, next) => {
  try {
    const recipeId = req.params.recipeId;
    if (!recipeId) {
      throw new BadRequest('ID рецепта обязательный параметр');
    }

    const recipe = await Recipe.findById(recipeId);
    if (!recipe) throw new NotFound('Рецепт не найден');

    const resultForUser = await User.updateOne({ _id: req.session.userId }, { $pull: { favourite: recipe._id } });
    const resultForRecipe = await Recipe.updateOne({ _id: recipeId }, { $pull: { quantityLiked: req.session.userId } });

    if (resultForUser.modifiedCount === 0 || resultForRecipe.modifiedCount === 0) {
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
    const updatedUser = await User.findById(req.session.userId);
    if (!updatedUser) throw new NotFound('Пользователь не найден');

    /*check includes*/
    if (!updatedUser.favourite.includes(recipe._id)) {
      recipe.quantityLiked.push(updatedUser._id);
      updatedUser.favourite.push(recipe._id);
      console.log(recipe);
      await updatedUser.save();
      await recipe.save();
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
