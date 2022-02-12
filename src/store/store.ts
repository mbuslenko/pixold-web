import { configureStore } from '@reduxjs/toolkit';

import { alertSliceReducer } from './alertSlice';
import { socketSliceReducer } from './socketSlice';

export const store = configureStore({
  reducer: {
    alert: alertSliceReducer,
    socket: socketSliceReducer,
  },
});
