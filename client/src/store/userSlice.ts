import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import UserType from "../Types/UserType";

export const getUser = createAsyncThunk(
  'user/getUser',
  async (_, {dispatch, rejectWithValue}) => {
    try {
      const res = await fetch('http://localhost:2020/users/me',{
        credentials: 'include',
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
    user: {} as UserType | null,
    status: {error: null, msg: ''}
  },
  reducers: {
    initUser: (state, action) => {
      console.log(action.payload)
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    }
  },
})

export const {initUser, clearUser} = userSlice.actions;

export default userSlice.reducer;