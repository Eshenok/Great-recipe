import { createAsyncThunk } from "@reduxjs/toolkit";
import { Error500 } from "../../../errorHandler/Error500";
import { BASE_URL } from "../../../constants";
import { clearUser } from "../../../store/userSlice";

export const signOut = createAsyncThunk(
  'users/signOut',
  async (_, {dispatch, rejectWithValue, getState}) => {
    try {
      const res = await fetch(`${BASE_URL}/users/signout`, {
        method: 'GET',
        credentials: 'include',
      });
      if (!res || res.status !== 200) Error500(res, 'error');
      dispatch(clearUser());
    } catch (err) {
      return rejectWithValue(err);
    }
  }
)