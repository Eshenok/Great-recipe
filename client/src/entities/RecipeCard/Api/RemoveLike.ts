import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../../../constants";
import { CentralErrorHandler } from "../../../errorHandler/CentralErrorHandler";
import { removeLiked, updateLiked } from "../../../store/userSlice";
export const removeLikeFetch = createAsyncThunk(
  'user/removeLike',
  async (recipeId: string, {dispatch, rejectWithValue}) => {
    try {
      const res = await fetch(`${BASE_URL}/recipes/remove/${recipeId}/`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          "Content-Type": "application/json"
        },
      });

      CentralErrorHandler(res);
      dispatch(removeLiked(recipeId));
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
)