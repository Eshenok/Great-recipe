import { createAsyncThunk } from "@reduxjs/toolkit";
import { Error500 } from "../../../errorHandler/Error500";
import { ServerRecipeType } from "../../../Types/ServerRecipeType";
import { changeFetchRecipesStatus, pushRecipesMain } from "../../../store/recipesSlice";
import { RootState } from "../../../store";

export const getRndRecipes = createAsyncThunk(
  'recipes/getRnd',
  async (_, {dispatch, rejectWithValue, getState}) => {
    const state = getState() as RootState;
    const status = state.recipes.recipesStatus;
    if (!status) {
      return;
    }
    try {
      const res = await fetch('http://localhost:2020/recipes/rnd', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
      })

      Error500(res,'Server');
      if (res.status === 204) {
        dispatch(changeFetchRecipesStatus(false));
      };

      const data: {recipes: ServerRecipeType[]} = await res.json();
      dispatch(pushRecipesMain(data.recipes));

    } catch (err) {
      return rejectWithValue(err);
    }
  }
)