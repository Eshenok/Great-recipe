import { createSlice } from "@reduxjs/toolkit";
import { ServerRecipeType } from "../Types/ServerRecipeType";

interface IInitialState {
  recipes: ServerRecipeType[],
  fridgeRecipes: ServerRecipeType[],
}

const initialState: IInitialState = {recipes: [], fridgeRecipes: []};

export const recipesSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {
    pushRecipesMain: (state, action) => {
      state.recipes = [...state.recipes, ...action.payload];
    },
    pushRecipesFridge: (state, action) => {
      state.fridgeRecipes = [...state.recipes, ...action.payload];
    }
  }
})

export const {pushRecipesFridge, pushRecipesMain} = recipesSlice.actions;

export default recipesSlice.reducer;