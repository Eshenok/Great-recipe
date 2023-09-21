/*imports*/
const Recipe = require('../models/recipe');
const User = require('../models/user');
const mongoose = require('mongoose');
/*errors*/
const NotFound = require('../errors/NotFound');
const BadRequest = require('../errors/BadRequest');

module.exports.findRecipesByIngredients = async (req, res, next) => {
  try {
    const ingredientsToFind = req.body.ingridients;
    if (!ingredientsToFind) throw new BadRequest('Ingridients required');

    const recipes = await Recipe.find({ arrIngredients: { $in: ingredientsToFind } });
    if (!recipes) throw new NotFound('Recipes not found');

    res.status(200).json({recipes: recipes});
  } catch (err) {
    next(err)
  }
}

module.exports.getRandomRecipes = async (req, res, next) => {
  try {
    const ObjectId = mongoose.Types.ObjectId;
    const batchSize = 50; // Размер каждой порции рецептов
    const fetchedRecipeIds = req.session.fetchedRecipes.map(id => new ObjectId(id));

    // Проверяем, есть ли еще рецепты, которые не были включены в предыдущие запросы
    // const remainingRecipes = await Recipe.find({ _id: { $nin: req.session.fetchedRecipes } });
    const remainingRecipes = await Recipe.aggregate([
      {$match: {_id: { $nin: fetchedRecipeIds }}},
      {$sample: {size: batchSize}}
    ])

    if (remainingRecipes.length === 0) {
      return res.status(200).json({message: 'Already all recipes fetched'});
    }

    // Добавляем выбранные рецепты в массив уже полученных
    remainingRecipes.forEach(recipe => req.session.fetchedRecipes.push(recipe._id));
    console.log(remainingRecipes.length);
    return res.status(200).json({ recipes: remainingRecipes });
  } catch (err) {
    next(err)
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
