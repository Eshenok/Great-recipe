import { createAsyncThunk } from "@reduxjs/toolkit";
import { initUser } from "../../../../store/userSlice";
import UserType from "../../../../Types/UserType";

export const signIn = createAsyncThunk(
  'user/signIn',
  async (formData: {email: string, password: string}, {dispatch, rejectWithValue}) => {
    const {email, password} = formData;
    console.log(formData);
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

      if (!res || res.status === 500) {
        throw new Error("Server error");
      };
      if (res.status === 404) {
        throw new Error("Not found");
      };

      const user: {user: UserType} = await res.json();
      dispatch(initUser(user));
    } catch (err) {
      return rejectWithValue(err);
    }
  }
)