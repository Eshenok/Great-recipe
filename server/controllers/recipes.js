/*imports*/
const Recipe = require('../models/recipe');
const User = require('../models/user');
const mongoose = require('mongoose');
/*errors*/
const NotFound = require('../errors/NotFound');
const BadRequest = require('../errors/BadRequest');

module.exports.putRating = async (req, res, next) => {
  try {
    const rating = req.body.rating;
    if(!rating) throw new BadRequest('Rating required');

    const user = await User.findById(req.session.userId);
    if(!user) throw new NotFound('User not found');

    const recipeId = req.body.recipe;

    /*Uniqueness cannot be prescribed for an array at schema(*/
    const existingRating = await Recipe.findOne({
      _id: recipeId,
      "rating.user": user._id,
    });

    if (existingRating) {
      await Recipe.updateOne(
        {
          _id: recipeId,
          "rating.user": user._id,
        },
        {
          $set: {
            "rating.$.rate": rating,
          },
        }, {new: true}
      );
    } else {
      await Recipe.findByIdAndUpdate(recipeId, {$push: {"rating": {"user": user._id, "rate": rating}}}, {new: true});
    }

    const updatedRecipe = await Recipe.findById(recipeId);

    if (!updatedRecipe) throw new NotFound('Recipe not found');

    return res.send(updatedRecipe);
  } catch (err) {
    next(err)
  }
}

// ПОИСК РЕЦЕПТОВ ПО ИНГРИДИЕНТАМ
// В body передаем массив
module.exports.findRecipesByIngredients = async (req, res, next) => {
  try {
    const keysToFind = req.body.ingredients.map(ing => ing.toLowerCase());
    if (!keysToFind || keysToFind.length === 0) throw new BadRequest('Ingredients required');

    const nameRegexes = keysToFind.map(key => new RegExp(key, 'i'));

    const recipesFindByNames = await Recipe.find({ strMeal: { $in: nameRegexes } });

    const foundRecipeIds = recipesFindByNames.map(recipe => recipe.id);

    const recipesFindByIngs = await Recipe.find({ arrIngredients: { $in: nameRegexes }, _id: { $nin: foundRecipeIds } });

    const recipesArr = [...recipesFindByNames, ...recipesFindByIngs];

    const uniqueRecipes = recipesArr.reduce((accumulator, currentValue) => {
      const isUnique = accumulator.every(item => item._id !== currentValue._id);
      if (isUnique) {
        accumulator.push(currentValue);
      }
      return accumulator;
    }, []);

    console.log(uniqueRecipes);

    const refactorRecipes = uniqueRecipes.map((recipe) => {
      return {
        _id: recipe._id,
        name: recipe.strMeal,
        category: recipe.strCategory,
        rating: recipe.rating.reduce((accum, cur) => accum + cur.rate, 0),
        ingridientsQuantity: recipe.arrIngredients.filter(item => Boolean(item)).length,
        image: recipe.strMealThumb,
      }
    })

    if (!refactorRecipes || refactorRecipes.length === 0) throw new NotFound('Recipes not found');

    return res.status(200).json( refactorRecipes );
  } catch (err) {
    next(err);
  }
};



/*
* ПОЛУЧЕНИЕ СЛУЧАЙНЫХ РЕЦЕПТОВ
* Для каждого user в сессии хранится массив уже найденных рецептов, чтобы исключить дубликаты
* При повторном signin массив обнуляется
*/
module.exports.getRandomRecipes = async (req, res, next) => {
  try {
    const ObjectId = mongoose.Types.ObjectId;
    const batchSize = 50; // Размер каждой порции рецептов
    const fetchedRecipeIds = req.session.fetchedRecipes.map(id => new ObjectId(id));

    // Проверяем, есть ли еще рецепты, которые не были включены в предыдущие запросы
    const remainingRecipes = await Recipe.aggregate([
      {$match: {_id: { $nin: fetchedRecipeIds }}},
      {$sample: {size: batchSize}}
    ])

    if (remainingRecipes.length === 0) {
      return res.status(204).json({message: 'Already all recipes fetched'});
    }

    const refactorRecipes = await remainingRecipes.map((recipe) => {
      return {
        _id: recipe._id,
        name: recipe.strMeal,
        category: recipe.strCategory,
        rating: recipe.rating.reduce((accum, cur) => accum + cur.rate, 0),
        ingridientsQuantity: recipe.arrIngredients.filter(item => Boolean(item)).length,
        image: recipe.strMealThumb,
      }
    })

    // Добавляем выбранные рецепты в массив уже полученных
    remainingRecipes.forEach(recipe => req.session.fetchedRecipes.push(recipe._id));
    return res.status(200).json({ recipes: refactorRecipes });
  } catch (err) {
    next(err)
  }
}

module.exports.refreshFetchedRecipes = async (req, res, next) => {
  try {
    req.session.fetchedRecipes = [];
    res.status(200).json({message: 'fetched recipes refresh'});
  } catch (err) {
    next(err);
  }
}

// УДАЛЕНИЕ РЕЦЕПТОВ ИЗ ИЗБРАННОГО
// В params передаем ObjectId
module.exports.removeRecipeFromFavorite = async (req, res, next) => {
  try {
    /*get recipe id*/
    const recipeId = req.params.recipeId;
    if (!recipeId) {
      throw new BadRequest('ID required');
    }

    /*find recipe by id*/
    const recipe = await Recipe.findById(recipeId);
    if (!recipe) throw new NotFound('Recipe not found');

    /*update recipe and user*/
    const resultForUser = await User.updateOne({ _id: req.session.userId }, { $pull: { favorite: recipe._id } });
    const resultForRecipe = await Recipe.updateOne({ _id: recipeId }, { $pull: { quantityLiked: req.session.userId } });

    /*check modified*/
    if (resultForUser.modifiedCount === 0 || resultForRecipe.modifiedCount === 0) {
      return res.status(200).json({ message: 'Recipe already removed from favorite' });
    }

    return res.status(200).json({message: 'Recipe successfully removed from favorites'});
  } catch (err) {
    next(err);
  }
}

// ДОБАВЛЕНИЕ РЕЦЕПТОВ В ИЗБРАННОЕ
// В params передаем ObjectId
module.exports.addRecipeToFavorite = async (req, res, next) => {
  try {
    /*Get recipeId*/
    const recipeId = req.params.recipeId;
    if (!recipeId) {
      throw new BadRequest('ID required');
    }

    /*find recipe*/
    const recipe = await Recipe.findById(recipeId);
    if (!recipe) throw new NotFound('Recipe not found');

    /*find user after auth*/
    const updatedUser = await User.findById(req.session.userId);
    if (!updatedUser) throw new NotFound('User not found');

    /*check includes*/
    if (!updatedUser.favorite.includes(recipe._id)) {
      recipe.quantityLiked.push(updatedUser._id);
      updatedUser.favorite.push(recipe._id);
      await updatedUser.save();
      await recipe.save();
    } else {
      return res.status(200).json({message: 'Recipe already added to favorite'});
    }

    return res.status(200).json({message: 'Recipe successfully added to favorites'})
  } catch (err) {
    next(err);
  }
}

// ПОИСК РЕЦЕПТОВ ПО ID
// В params передаем ObjectId
module.exports.getRecipeForId = async (req, res, next) => {
  try {
    const recipeId = req.params.recipeId;
    if (!recipeId) {
      throw new BadRequest('ID Required');
    }
    const recipe = await Recipe.findById(recipeId);
    if (!recipe) {
      throw new NotFound('Recipe not found');
    }
    return res.send(recipe);
  } catch (err) {
    next(err);
  }
}
