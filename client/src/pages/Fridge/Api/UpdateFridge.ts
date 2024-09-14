import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../../../constants";
import { catchHandler } from "../../../errorHandler/CatchHandler";
import { CentralErrorHandler } from "../../../errorHandler/CentralErrorHandler";
import { initUser } from "../../../store/userSlice";

export const updateFridge = createAsyncThunk(
  'user/updateFridge',
  async (fridgeData: string[], {dispatch, rejectWithValue}) => {
    try {
      const res = await fetch(`${BASE_URL}/users/fridge`, {
        method: 'PATCH',
        credentials: 'include',
        headers: {
          "Content-Type": 'application/json'
        },
        body: JSON.stringify({fridge: fridgeData})
      })

      CentralErrorHandler(res);
      const updatedUser = await res.json();
      dispatch(initUser(updatedUser))
    } catch(err) {
      return catchHandler(err, rejectWithValue);
    }
  }
)