import { SerializedError } from '@reduxjs/toolkit';

export const catchHandler = (
  err: unknown, 
  rejectWithValue: (value: string | SerializedError) => void
) => {
  if (err instanceof Error) {
    return rejectWithValue(err.message);
  } else {
    return rejectWithValue('An unknown error occurred');
  }
};
