import { createAsyncThunk } from "@reduxjs/toolkit";
import { CentralErrorHandler } from "../../../errorHandler/CentralErrorHandler";
import { updateRecipe } from "../../../store/recipesSlice";

export const putRate = createAsyncThunk(
  'recipes/getRnd',
  async ({recipeId, rating}: {recipeId: string, rating: number}, {dispatch, rejectWithValue}) => {
    try {
      const res = await fetch('http://localhost:2020/recipes/rate', {
        method: 'PUT',
        credentials: 'include',
        headers: {
          "Content-Type": 'application/json'
        },
        body: JSON.stringify({"recipe": recipeId, rating})
      });

      CentralErrorHandler(res);
      const updatedRecipe = await res.json();
      console.log(updatedRecipe);
      dispatch(updateRecipe(updatedRecipe));
    } catch(err) {
      return rejectWithValue(err)
    }
  }
)