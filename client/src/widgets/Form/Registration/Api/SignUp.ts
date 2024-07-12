import { createAsyncThunk } from "@reduxjs/toolkit";
import { CentralErrorHandler } from "../../../../errorHandler/CentralErrorHandler";

export const signUp = createAsyncThunk(
  'user/signUp',
  async (formData: {email: string, password: string, name: string}, { rejectWithValue}) => {
    const {email, password, name} = formData;
    try {
      const res = await fetch('http://localhost:2020/signup', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "email": email,
          "password": password,
          "name": name
        })
      });

      CentralErrorHandler(res);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
)