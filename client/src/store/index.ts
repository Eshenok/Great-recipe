import { configureStore } from '@reduxjs/toolkit';
import categorySlice from "./categorySlice";
import userSlice from './userSlice';

const store = configureStore ({
  reducer: {
    categories: categorySlice,
    user: userSlice
  }
})

export default store;
