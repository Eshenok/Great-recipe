import { createSlice } from "@reduxjs/toolkit";
import FilterQueriesType from "../Types/FilterQueriesType";
import { RootState } from ".";

const initialState: FilterQueriesType = {isLiked: false, search: '', category: '', quantity:'', userRate:''};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    changeFilterQueryValue: (state, action) => {
      state[action.payload.name] = action.payload.value;
    },
    syncWithLS: (state, action) => {
      state = action.payload;
    }
  }
})

export const selectFilter = (state: RootState) => state.filter;

export const {changeFilterQueryValue, syncWithLS} = filterSlice.actions;

export default filterSlice.reducer;