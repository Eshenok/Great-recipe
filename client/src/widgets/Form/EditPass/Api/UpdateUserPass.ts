import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../../../../constants";
import { CentralErrorHandler } from "../../../../errorHandler/CentralErrorHandler";
import { initUser } from "../../../../store/userSlice";
import { catchHandler } from "../../../../errorHandler/CatchHandler";

export const updateUserPass = createAsyncThunk(
  'user/updatePass',
  async (formData: {email: string, oldPassword: string, newPassword: string}, {dispatch, rejectWithValue}) => {
    try {
      const res = await fetch(`${BASE_URL}/users/me/pass/`, {
        method: 'PATCH',
        credentials: 'include',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData),
      });

      CentralErrorHandler(res);
      const updatedUser = await res.json();
      dispatch(initUser(updatedUser))
    } catch (err) {
      return catchHandler(err, rejectWithValue)
    }
  }
)