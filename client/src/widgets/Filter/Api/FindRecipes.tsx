import { createAsyncThunk } from "@reduxjs/toolkit";
import {setFindedRecipes} from '../../../store/recipesSlice';
import FilterFetchDataType from "../../../Types/FilterFetchData";

export const findRecipesByKeys = createAsyncThunk(
  'recipes/findRecipesByKeys',
  async (data: FilterFetchDataType, {rejectWithValue, dispatch}) => {
    try {
      const res = await fetch(`http://localhost:2020/recipes/find`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          "Content-Type": 'application/json'
        },
        body: JSON.stringify(data)
      })
      if (!res || res.status === 500) throw new Error('Server error');
      if (res.status === 404) {
        dispatch(setFindedRecipes([]));
        throw new Error('Not Found')
      };

      const recipes = await res.json();
      dispatch(setFindedRecipes([]));
      dispatch(setFindedRecipes(recipes));
    } catch (err) {
      return rejectWithValue(err);
    }
  }
)