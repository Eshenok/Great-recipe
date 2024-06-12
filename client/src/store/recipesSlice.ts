import { createSlice } from "@reduxjs/toolkit";
import { ClippedServerRecipeType } from "../Types/ServerRecipeType";
import { RootState } from ".";
import { findRecipesByKeys } from "../widgets/Filter/Api/FindRecipes";

interface IInitialState {
  recipes: ClippedServerRecipeType[],
  fridgeRecipes: ClippedServerRecipeType[],
  recipesStatus: boolean,
  fridgeRecipesStatus: boolean,
  findedRecipes: ClippedServerRecipeType[],
  findedRecipesStatus: boolean,
}

const initialState: IInitialState = {recipes: [], fridgeRecipes: [], recipesStatus: true, fridgeRecipesStatus: true, findedRecipes: [], findedRecipesStatus: true };

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
    },
    setFindedRecipes: (state, action) => {
      state.findedRecipes = action.payload;
    },
    dropRecipes: (state) => {
      state.recipes = [];
    },
    dropfindedRecipesStatus: (state) => {
      state.findedRecipesStatus = true;
    }
  },
  extraReducers: {
    [findRecipesByKeys.rejected]: (state) => {
      state.findedRecipesStatus = false;
    },
    [findRecipesByKeys.pending]: (state) => {
      state.findedRecipesStatus = true;
    }
  }
})

export const selectRecipes = (state: RootState) => state.recipes.recipes;

export const {dropfindedRecipesStatus, pushRecipesFridge, pushRecipesMain, changeFetchRecipesFstatus, changeFetchRecipesStatus, setFindedRecipes, dropRecipes} = recipesSlice.actions;

export default recipesSlice.reducer;