import { createAsyncThunk } from "@reduxjs/toolkit";
import { Error500 } from "../../../errorHandler/Error500";
import { ServerRecipeType } from "../../../Types/ServerRecipeType";
import { pushRecipesMain } from "../../../store/recipesSlice";

export const getRndRecipes = createAsyncThunk(
  'recipes/getRnd',
  async (_, {dispatch, rejectWithValue, getState}) => {
    try {
      const res = await fetch('http://localhost:2020/recipes/rnd', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      Error500(res,'Server');
      if (res.status === 204) return;

      const data: {recipes: ServerRecipeType[]} = await res.json();
      dispatch(pushRecipesMain(data.recipes));

    } catch (err) {
      return rejectWithValue(err);
    }
  }
)