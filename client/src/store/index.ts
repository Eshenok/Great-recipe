import { configureStore } from '@reduxjs/toolkit';
import categorySlice from "./categorySlice";
import userSlice from './userSlice';
import recipesSlice from './recipesSlice';

const store = configureStore ({
  reducer: {
    categories: categorySlice,
    user: userSlice,
    recipes: recipesSlice,
  }
})

export default store;
