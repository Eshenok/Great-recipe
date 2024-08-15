/*imports*/
const mongoose = require('mongoose');
const { patternUrl } = require('../middlewares/constants');

const recipeSchema = new mongoose.Schema({
  strMeal: {
    required: true,
    type: String,
  },
  strDrinkAlternate: {
    type: String,
  },
  strCategory: {
    required: true,
    type: String,
  },
  strArea: {
    required: true,
    type: String
  },
  strInstructions: {
    required: true,
    type: String
  },
  strMealThumb: {
    required: true,
    type: String,
  },
  strTags: {
    type: String
  },
  strYoutube: {
    type: String,
  },
  strSource: {
    type: String,
  },
  strImageSource: {
    type: String,
  },
  strCreativeCommonsConfirmed: {
    type: String
  },
  dateModified: {
    type: Date
  },
  quantityLiked: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  }],
  rating: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user', // Ссылка на модель User
    },
    rate: Number
  }],
  averageRate: {
    type: Number
  },
  arrIngredients: {
    type: [String],
    default: [],
    required: true
  },
  arrMeasure: {
    type: [String],
    default: [],
    required: true
  }
});

module.exports = mongoose.model('recipe', recipeSchema);
