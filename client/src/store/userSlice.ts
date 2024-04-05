import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import UserType from "../Types/UserType";

export const signIn = createAsyncThunk(
  'user/signIn',
  async (formData: {email: string, password: string}, {dispatch, rejectWithValue}) => {
    const {email, password} = formData;
    console.log(formData);
    try {
      const res = await fetch('http://localhost:2020/signin', {
        method: 'POST',
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

export const getUser = createAsyncThunk(
  'user/getUser',
  async (_, {dispatch, rejectWithValue}) => {
    try {
      const res = await fetch('http://localhost:2020/users/me',{
        method: 'GET',
        credentials: 'include'
      });
      if (res.status === 401 || res.status === 500) {
        throw new Error('Ошибка при получении данных');
      }
      const user: {user: UserType} = await res.json();
      dispatch(initUser(user));
    } catch (err) {
      return rejectWithValue(err);
    }
  }
)

export const userSlice = createSlice({
  name: 'user',
  initialState:{
    user: {}
  },
  reducers: {
    initUser: (state, action) => {
      console.log(action.payload)
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = {};
    }
  }
})

export const {initUser, clearUser} = userSlice.actions;

export default userSlice.reducer;