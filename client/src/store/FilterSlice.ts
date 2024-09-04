import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import FilterQueriesType from "../Types/FilterQueriesType";
import { RootState } from ".";

const initialState: FilterQueriesType = {isLiked: false, search: '', category: '', quantity:'', userRate:''};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    changeFilterQueryValue: <K extends keyof FilterQueriesType>(state: FilterQueriesType, action: PayloadAction<{ name: K; value: FilterQueriesType[K] }>) => {
      state[action.payload.name] = action.payload.value;
    },
    syncWithLS: (state, action) => {
      console.log(state);
      state = action.payload;
    }
  }
})

export const selectFilter = (state: RootState) => state.filter;

export const {changeFilterQueryValue, syncWithLS} = filterSlice.actions;

export default filterSlice.reducer;