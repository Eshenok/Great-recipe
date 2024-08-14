import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import UserType from "../Types/UserType";
import { updateUser } from "../pages/Profile/Api/UpdateUser";
import { error } from "console";
import { updateUserPass } from "../widgets/Form/EditPass/Api/UpdateUserPass";
import { signIn } from "../widgets/Form/Login/Api/SignIn";
import { signUp } from "../widgets/Form/Registration/Api/SignUp";

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
  status: {error: null | boolean, msg: string}, 
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
    updateLiked: (state, action) => {
      const user: UserType = state.user as UserType;
      state.user = {...user, favorite:[...user.favorite, action.payload]};
    },
    dropStatus: (state) => {
      state.status = {error: null, msg: ''}
    }
  },
  extraReducers: (builder) => {
    builder
    // Обновление Пользователя
    .addCase(updateUser.rejected, (state, action) => {
      console.log('we are here')
      state.status = {error: true, msg: action.payload as string}
    })
    .addCase(updateUser.fulfilled, (state) => {
      state.status = {error: false, msg: '200 Update'}
    })
    // Обновление Пароля
    .addCase(updateUserPass.rejected, (state, action) => {
      console.log('we are here');
      state.status = {error: true, msg: action.payload as string}
    })
    .addCase(updateUserPass.fulfilled, (state) => {
      state.status = {error: false, msg: '200 Update'}
    })
    // Вход ЛОГИН.ПАСС
    .addCase(signIn.rejected, (state, action) => {
      state.status = {error: true, msg: action.payload as string}
    })
    .addCase(signIn.fulfilled, (state) => {
      state.status = {error: null, msg: ''}
    })
    // Регистрация пользователя
    .addCase(signUp.rejected, (state, action) => {
      state.status = {error: true, msg: action.payload as string}
    })
    .addCase(signUp.fulfilled, (state) => {
      state.status = {error: null, msg: ''}
    })
  }
})

export const {initUser, clearUser, dropStatus, updateLiked} = userSlice.actions;

export default userSlice.reducer;