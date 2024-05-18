import { createAsyncThunk } from "@reduxjs/toolkit";
import { Error500 } from "../../../errorHandler/Error500";

export const dropFetchedRecipes = createAsyncThunk(
  'recipes/dropRecipes',
  async (_, { rejectWithValue}) => {
    try {
      const res = await fetch('http://localhost:2020/recipes//refresh', {
        method: 'GET',
        credentials: 'include',
      })

      Error500(res,'Server');
      console.log(res.status);

    } catch (err) {
      return rejectWithValue(err);
    }
  }
)