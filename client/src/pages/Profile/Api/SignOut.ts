import { createAsyncThunk } from "@reduxjs/toolkit";
import { Error500 } from "../../../errorHandler/Error500";
import { BASE_URL } from "../../../constants";
import { clearUser } from "../../../store/userSlice";
import { dropRecipes } from "../../../store/recipesSlice";
import { getRndRecipes } from "../../Main/Api/GetRndRecipes";

export const signOut = createAsyncThunk(
  'users/signOut',
  async (_, {dispatch, rejectWithValue}) => {
    try {
      const res = await fetch(`${BASE_URL}/users/signout`, {
        method: 'GET',
        credentials: 'include',
      });
      if (!res || res.status !== 200) Error500(res, 'error');
      dispatch(dropRecipes());
      dispatch(clearUser());
      dispatch(getRndRecipes());
    } catch (err) {
      return rejectWithValue(err);
    }
  }
)