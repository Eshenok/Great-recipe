import { configureStore } from '@reduxjs/toolkit';
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

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store;
