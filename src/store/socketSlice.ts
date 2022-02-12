import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IStoreSocketState } from './interfaces';

const initialState: IStoreSocketState = {
  isSocketConnected: false,
};

export const socketSlice = createSlice({
  name: 'socket',
  initialState,
  reducers: {
    setIsSocketConnected: (state, action: PayloadAction<boolean>) => {
      state.isSocketConnected = action.payload;
    },
  },
});

export const { setIsSocketConnected } = socketSlice.actions;

export const socketSliceReducer = socketSlice.reducer;
