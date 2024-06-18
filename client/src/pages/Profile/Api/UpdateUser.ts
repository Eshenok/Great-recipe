import { createAsyncThunk } from "@reduxjs/toolkit";
import { Error500 } from "../../../errorHandler/Error500";
import { BASE_URL } from "../../../constants";
import { clearUser, initUser } from "../../../store/userSlice";

export const updateUser = createAsyncThunk(
  'users/updateUser',
  async (data: Record<string, string>, {dispatch, rejectWithValue, getState}) => {
    try {
      const res = await fetch(`${BASE_URL}/users/me`, {
        method: 'PATCH',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: data.email,
          password: data.pass,
          newName: data.name,
          newEmail: data.nEmail
        })
      });
      if (!res || res.status !== 200) Error500(res, 'error');
      const user = await res.json();
      dispatch(initUser(user));
    } catch (err) {
      return rejectWithValue(err);
    }
  }
)