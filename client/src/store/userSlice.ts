import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import UserType from "../Types/UserType";
import { updateUser } from "../pages/Profile/Api/UpdateUser";
import { error } from "console";

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

interface IInitialState {
  user: UserType | {},
  status: {error: null | string, msg: string}, 
  }

const initialState: IInitialState = {user: {}, status: {error: null, msg: ''}};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    initUser: (state, action) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = {};
    },
    dropStatus: (state) => {
      state.status = {error: null, msg: ''}
    }
  },
  extraReducers: {
    [updateUser.rejected]: (state, action) => {
     state.status = {error: 'error', msg: action.payload} 
    }
  }
})

export const {initUser, clearUser} = userSlice.actions;

export default userSlice.reducer;