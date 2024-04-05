import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import UserType from "../Types/UserType";

export const signIn = createAsyncThunk(
  'user/signIn',
  async (formData, {dispath, rejectWithValue}) => {
    
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
      console.log(action.payload.user)
      state.user = action.payload.user.user;
    },
    clearUser: (state) => {
      state.user = {};
    }
  }
})

export const {initUser, clearUser} = userSlice.actions;

export default userSlice.reducer;