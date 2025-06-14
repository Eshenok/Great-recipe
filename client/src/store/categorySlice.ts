import {createSlice} from "@reduxjs/toolkit";
import {TEXTS} from "../constants";
import {CategoryItemFullType} from "../Types/CategoryItemType";
import LanguageType from "../Types/LanguageType";

interface IInititalState {
  categories: CategoryItemFullType[];
}

const initialState: IInititalState = {
  categories: [],
};

export const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    initCategories: (state, action) => {
      const language: LanguageType = action.payload.language;
      const arr = Object.entries(TEXTS[language].categories);
      state.categories = arr.map(([key, category]) => {
        return { ...category, checked: false, key: key };
      });
    },
    changeCurrCategories(state, action) {
      const currCategory = state.categories.find((category) => action.payload.name === category.key);
      if (!currCategory) return;
      if (currCategory.checked) {
        currCategory.checked = false;
      } else {
        state.categories.forEach((category) => {category.checked = false});
        currCategory.checked = true;
      }
    }

  }
});

export const selectCategories = (state: { categories: IInititalState }) => state.categories;

export const {initCategories, changeCurrCategories} = categorySlice.actions;

export default categorySlice.reducer;
