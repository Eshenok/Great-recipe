import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../../../constants";
import { CentralErrorHandler } from "../../../errorHandler/CentralErrorHandler";
import { updateLiked } from "../../../store/userSlice";
export const putLikeFetch = createAsyncThunk(
  'user/putLike',
  async (recipeId: string, {dispatch, rejectWithValue}) => {
    try {
      const res = await fetch(`${BASE_URL}/recipes/add/${recipeId}/`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          "Content-Type": "application/json"
        },
      });

      CentralErrorHandler(res);
      if (res.status === 204) {
        return;
      }
      dispatch(updateLiked(recipeId));
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
)