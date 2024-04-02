import {createSlice} from "@reduxjs/toolkit";
import {TEXTS} from "../constants";

type CategoriesT = {
  name: string,
  key: string,
  checked: boolean,
  image: string
}

export const categorySlice = createSlice({
  name: 'categories',
  initialState: {
    categories: [],
  },
  reducers: {
    initCategories(state, action) {
      state.categories = Object.entries(TEXTS[action.payload.language].categories).map(([key, category]) => {
        return {...category, checked: false, key: key}
      });
    },
    changeCurrCategories(state, action) {
      const currCategory = state.categories.find((category) => action.payload.name === category.name);
      if (currCategory.checked === true) {
        currCategory.checked = false;
      } else {
        state.categories.forEach((category) => {category.checked = false});
        currCategory.checked = true;
      }
    }

  }
});

export const {initCategories, changeCurrCategories} = categorySlice.actions;

export default categorySlice.reducer;
