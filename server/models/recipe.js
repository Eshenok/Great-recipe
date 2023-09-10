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
  strInstruction: {
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
  strIngridient1: {
    type: String
  },
  strIngridient2: {
    type: String
  },
  strIngridient3: {
    type: String
  },
  strIngridient4: {
    type: String
  },
  strIngridient5: {
    type: String
  },
  strIngridient6: {
    type: String
  },
  strIngridient7: {
    type: String
  },
  strIngridient8: {
    type: String
  },
  strIngridient9: {
    type: String
  },
  strIngridient10: {
    type: String
  },
  strIngridient11: {
    type: String
  },
  strIngridient12: {
    type: String
  },
  strIngridient13: {
    type: String
  },
  strIngridient14: {
    type: String
  },
  strIngridient15: {
    type: String
  },
  strIngridient16: {
    type: String
  },
  strIngridient17: {
    type: String
  },
  strIngridient18: {
    type: String
  },
  strIngridient19: {
    type: String
  },
  strIngridient20: {
    type: String
  },
  strMeasure1: {
    type: String
  },
  strMeasure2: {
    type: String
  },
  strMeasure3: {
    type: String
  },
  strMeasure4: {
    type: String
  },
  strMeasure5: {
    type: String
  },
  strMeasure6: {
    type: String
  },
  strMeasure7: {
    type: String
  },
  strMeasure8: {
    type: String
  },
  strMeasure9: {
    type: String
  },
  strMeasure10: {
    type: String
  },
  strMeasure11: {
    type: String
  },
  strMeasure12: {
    type: String
  },
  strMeasure13: {
    type: String
  },
  strMeasure14: {
    type: String
  },
  strMeasure15: {
    type: String
  },
  strMeasure16: {
    type: String
  },
  strMeasure17: {
    type: String
  },
  strMeasure18: {
    type: String
  },
  strMeasure19: {
    type: String
  },
  strMeasure20: {
    type: String
  },
  strSource: {
    type: String,
    match: patternUrl
  },
  strImageSource: {
    type: String,
    match: patternUrl
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
});

module.exports = mongoose.model('recipe', recipeSchema);
