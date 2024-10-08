export type ratingType = {
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
  averageRate: number;
  arrIngredients: (string | null)[];
  arrMeasure: (string | null)[];
}

export type ClippedServerRecipeType = {
  _id: string;
  name: string;
  ingridientsQuantity: number;
  rating: number;
  category: string;
  image: string;
}