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
      for (let key in action.payload) {
        console.log(key);
        console.log(action.payload[key]);
        state[key] = action.payload[key]
      }
    }
  }
})

export const selectFilter = (state: RootState) => state.filter;

export const {changeFilterQueryValue, syncWithLS} = filterSlice.actions;

export default filterSlice.reducer;