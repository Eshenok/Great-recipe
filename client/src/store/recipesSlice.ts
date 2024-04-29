import { createSlice } from "@reduxjs/toolkit";
import { ServerRecipeType } from "../Types/ServerRecipeType";
import { RootState } from ".";

interface IInitialState {
  recipes: ServerRecipeType[],
  fridgeRecipes: ServerRecipeType[],
  recipesStatus: boolean,
  fridgeRecipesStatus: boolean,
}

const initialState: IInitialState = {recipes: [], fridgeRecipes: [], recipesStatus: true, fridgeRecipesStatus: true};

export const recipesSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {
    pushRecipesMain: (state, action) => {
      state.recipes = [...state.recipes, ...action.payload];
    },
    pushRecipesFridge: (state, action) => {
      state.fridgeRecipes = [...state.recipes, ...action.payload];
    },
    changeFetchRecipesStatus: (state, action) => {
      state.recipesStatus = action.payload;
    },
    changeFetchRecipesFstatus: (state, action) => {
      state.fridgeRecipesStatus = action.payload;
    }
  }
})

export const selectRecipes = (state: RootState) => state.recipes.recipes;

export const {pushRecipesFridge, pushRecipesMain, changeFetchRecipesFstatus, changeFetchRecipesStatus} = recipesSlice.actions;

export default recipesSlice.reducer;