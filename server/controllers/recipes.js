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

     // Вычисление среднего рейтинга
     const sum = updatedRecipe.rating.reduce((total, item) => total + item.rate, 0);
     const averageRate = updatedRecipe.rating.length > 0 ? sum / updatedRecipe.rating.length : 0;
 
     // Обновление поля averageRate
     updatedRecipe.averageRate = averageRate;
     await updatedRecipe.save();

    return res.send(updatedRecipe);
  } catch (err) {
    next(err)
  }
}

// ПОИСК РЕЦЕПТОВ ПО ИНГРИДИЕНТАМ
// В body передаем массив
// module.exports.findRecipesByIngredients = async (req, res, next) => {
//   try {
//     const body = req.body;
//     let recipesArr = [];
//     const optionsForSearch = {
//       keysToFind: null,
//       category: '',
//     }
//     if (body.ingredients) {
//       optionsForSearch.keysToFind = req.body.ingredients.map(ing => ing.toLowerCase());
//     }
//     if (body.category) {
//       optionsForSearch.category = body.category.toLowerCase().charAt(0).toUpperCase() + body.category.slice(1);
//     }

//     const nameRegexes = optionsForSearch.keysToFind.map(key => new RegExp(key, 'i'));
//     const recipesFindByNames = await Recipe.find({ strMeal: { $in: nameRegexes }  });
//     recipesArr.push(...recipesFindByNames);
//     const ingQuery = recipesFindByNames.map(recipe => recipe._id);
//     const recipesFindByIngs = await Recipe.find({ arrIngredients: { $in: nameRegexes }, _id: { $nin: ingQuery } });
//     recipesArr.push(...recipesFindByIngs);

//     // console.log(recipesArr);
//     const refactorRecipes = recipesArr.map((recipe) => {
      
//       const rating = recipe.rating.reduce((accum, cur) => accum + cur.rate, 0);
//       const ingridientsQuantity = recipe.arrIngredients.filter(item => Boolean(item)).length;
//       return {
//         _id: recipe._id,
//         name: recipe.strMeal,
//         category: recipe.strCategory,
//         rating,
//         ingridientsQuantity,
//         image: recipe.strMealThumb,
//       }
//     })

//     if (!refactorRecipes || refactorRecipes.length === 0) throw new NotFound('Recipes not found');

//     return res.status(200).json( refactorRecipes );
//   } catch (err) {
//     next(err);
//   }
// };

module.exports.findRecipesByIngredients = async (req, res, next) => {
  try {
    const body = req.body;
    let filter = {};
    let recipesArr = [];
    console.log(body);

    // Фильтрация по ингредиентам
    if (body.ingredients) {
      const nameRegexes = body.ingredients.map(ing => new RegExp(ing.toLowerCase(), 'i'));
      filter.$or = [
        { strMeal: { $in: nameRegexes } },
        { arrIngredients: { $in: nameRegexes } }
      ];
    }

    // Фильтрация по категории
    if (body.category) {
      filter.strCategory = body.category.toLowerCase().charAt(0).toUpperCase() + body.category.slice(1);
    }

    // Фильтрация по количеству ингредиентов
    if (body.ingQuantity) {
      filter.$expr = { $lte: [{ $size: "$arrIngredients" }, body.ingQuantity] };
    }

    // Фильтрация по рейтингу пользователей
    if (body.userRating) {
      filter.averageRate = { $gte: body.userRating };
    }

    // Фильтрация по лайкам
    if (body.liked) {
      filter.quantityLiked = { $exists: true, $not: { $size: 0 } };
    }

    // Поиск рецептов
    recipesArr = await Recipe.find(filter);

    // Преобразование рецептов
    const refactorRecipes = recipesArr.map((recipe) => {
      return {
        _id: recipe._id,
        name: recipe.strMeal,
        category: recipe.strCategory,
        rating: recipe.averageRate,
        ingridientsQuantity: recipe.arrIngredients.length,
        image: recipe.strMealThumb,
      }
    });

    if (!refactorRecipes || refactorRecipes.length === 0) throw new NotFound('Recipes not found');

    return res.status(200).json(refactorRecipes);
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
    const batchSize = 30; // Размер каждой порции рецептов
    const fetchedRecipeIds = await req.session.fetchedRecipes.map(id => new ObjectId(id));

    // Проверяем, есть ли еще рецепты, которые не были включены в предыдущие запросы
    const remainingRecipes = await Recipe.aggregate([
      {$match: {_id: { $nin: fetchedRecipeIds }}},
      {$sample: {size: batchSize}},
    ])

    if (remainingRecipes.length === 0) {
      return res.status(204).json({message: 'Already all recipes fetched'});
    }

    const refactorRecipes = remainingRecipes.map((recipe) => {
      return {
        _id: recipe._id,
        name: recipe.strMeal,
        category: recipe.strCategory,
        rating: recipe.averageRate,
        ingridientsQuantity: recipe.arrIngredients.length,
        image: recipe.strMealThumb,
      }
    })

    // Добавляем выбранные рецепты в массив уже полученных
    remainingRecipes.forEach(recipe => req.session.fetchedRecipes.push(recipe._id));
    console.log(req.session.fetchedRecipes.length);
    return res.status(200).json({ recipes: refactorRecipes });
  } catch (err) {
    next(err)
  }
}

/*
 *
 *
 * 
*/

module.exports.refreshFetchedRecipes = async (req, res, next) => {
  try {
    req.session.fetchedRecipes = [];
    console.log(req.session.fetchedRecipes);
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
