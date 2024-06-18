import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';
import categorySlice from "./categorySlice";
import userSlice from './userSlice';
import recipesSlice from './recipesSlice';

const store = configureStore ({
  reducer: {
    categories: categorySlice,
    user: userSlice,
    recipes: recipesSlice,
  },
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export default store;
