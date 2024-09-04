import { createAsyncThunk } from "@reduxjs/toolkit";
import { initUser } from "../../../../store/userSlice";
import UserType from "../../../../Types/UserType";
import { CentralErrorHandler } from "../../../../errorHandler/CentralErrorHandler";
import { getRndRecipes } from "../../../../pages/Main/Api/GetRndRecipes";
import { catchHandler } from "../../../../errorHandler/CatchHandler";

export const signIn = createAsyncThunk(
  'user/signIn',
  async (formData: {email: string, password: string}, {dispatch, rejectWithValue}) => {
    const {email, password} = formData;
    try {
      const res = await fetch('http://localhost:2020/signin', {
        method: 'POST',
        credentials: 'include',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "email": email,
          "password": password
        })
      });

      CentralErrorHandler(res);

      const user: {user: UserType} = await res.json();
      dispatch(initUser(user));
      dispatch(getRndRecipes());
    } catch (err) {
      return catchHandler(err, rejectWithValue)
    }
  }
)