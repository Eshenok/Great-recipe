type ratingType = {
  rate: number;
  _id: string;
  user: string;
}

export type ServerRecipeType = {
  _id: string;
  idMeal: string;
  strMeal: string;
  strDrinkAlternate: null | string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strTags: null | string;
  dateModified: null | string;
  quantityLiked: string[];
  rating: ratingType[];
  __v: number;
  arrIngredients: (string | null)[];
  arrMeasure: (string | null)[];
}
