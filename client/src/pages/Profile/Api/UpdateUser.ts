import { createAsyncThunk } from "@reduxjs/toolkit";
import { Error500 } from "../../../errorHandler/Error500";
import { BASE_URL } from "../../../constants";
import { clearUser, initUser } from "../../../store/userSlice";
import { CentralErrorHandler } from "../../../errorHandler/CentralErrorHandler";

export const updateUser = createAsyncThunk(
  'users/updateUser',
  async (data: Record<string, string>, {dispatch, rejectWithValue, getState}) => {
    try {
      const {user} = getState().user;
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
      console.log(res);
      const updUser = await res.json();
      dispatch(initUser(updUser));
    } catch (err) {
      console.log('catch find')
      return rejectWithValue(err.message);
    }
  }
)