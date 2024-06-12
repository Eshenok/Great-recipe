import { createAsyncThunk } from "@reduxjs/toolkit";
import { Error500 } from "../../../errorHandler/Error500";
import { changeFetchRecipesStatus, dropRecipes } from "../../../store/recipesSlice";

export const dropFetchedRecipes = createAsyncThunk(
  'recipes/dropRecipes',
  async (_, {dispatch, rejectWithValue}) => {
    try {
      const res = await fetch('http://localhost:2020/recipes//refresh', {
        method: 'GET',
        credentials: 'include',
      })

      Error500(res,'Server');
      dispatch(dropRecipes());
      dispatch(changeFetchRecipesStatus(true));
      

    } catch (err) {
      return rejectWithValue(err);
    }
  }
)