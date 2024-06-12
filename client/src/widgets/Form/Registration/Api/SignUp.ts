import { createAsyncThunk } from "@reduxjs/toolkit";

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

      if (!res || res.status === 500) {
        throw new Error("Server error");
      };
      if (res.status === 409) {
        throw new Error("User already been created");
      };
    } catch (err) {
      return rejectWithValue(err);
    }
  }
)