import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../../../constants";
import { initUser } from "../../../store/userSlice";
import { CentralErrorHandler } from "../../../errorHandler/CentralErrorHandler";
import { catchHandler } from "../../../errorHandler/CatchHandler";
import { RootState } from "../../../store";
import UserType from "../../../Types/UserType";

export const updateUser = createAsyncThunk(
  'users/updateUser',
  async (data: Record<string, string>, {dispatch, rejectWithValue, getState}) => {
    try {
      const state = getState() as RootState;
      const user = state.user.user as UserType;
      const res = await fetch(`${BASE_URL}/users/me`, {
        method: 'PATCH',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: user.email,
          password: data.pass,
          newName: data.name,
          newEmail: data.nEmail
        })
      });
      CentralErrorHandler(res);
      const updUser = await res.json();
      dispatch(initUser(updUser));
    } catch (err) {
      return catchHandler(err, rejectWithValue);
    }
  }
)