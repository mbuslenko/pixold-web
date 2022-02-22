import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';

import { AppSelector, StoreDispatch } from './types';
import { alertSliceReducer } from './alertSlice';
import { socketSliceReducer } from './socketSlice';
import { userSliceReducer } from './userSlice';

export const store = configureStore({
  reducer: {
    alert: alertSliceReducer,
    socket: socketSliceReducer,
    user: userSliceReducer,
  },
});

export const useAppDispatch = () => useDispatch<StoreDispatch>();
export const useAppSelector: AppSelector = useSelector;
