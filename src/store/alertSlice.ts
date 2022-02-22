import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AlertInfo } from '../components/types';
import { IStoreAlertState } from './interfaces';

const initialState: IStoreAlertState = {
  isShownAttackAlert: false,
  infoAlertAll: [],
  alertAll: [],
};

const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    setIsShownAttackAlert: (state, action: PayloadAction<boolean>): void => {
      state.isShownAttackAlert = action.payload;
    },

    addInfoAlert: (state, action: PayloadAction<Omit<AlertInfo, 'type' | 'date'>>): void => {
      state.infoAlertAll = [{ date: new Date().toString(), ...action.payload }, ...state.infoAlertAll];
    },

    removeInfoAlert: (state, action: PayloadAction<number>): void => {
      state.infoAlertAll = [
        ...state.infoAlertAll.slice(0, action.payload),
        ...state.infoAlertAll.slice(action.payload + 1),
      ];
    },

    addAlert: (state, action: PayloadAction<Omit<AlertInfo, 'date'>>): void => {
      state.alertAll = [{ date: new Date().toString(), ...action.payload }, ...state.alertAll];
    },

    removeAlert: (state, action: PayloadAction<number>): void => {
      state.alertAll = [...state.alertAll.slice(0, action.payload), ...state.alertAll.slice(action.payload + 1)];
    },

    clearAlertAll: (state): void => {
      state.infoAlertAll = [];
      state.alertAll = [];
      state.isShownAttackAlert = false;
    },
  },
});

export const { setIsShownAttackAlert, addAlert, addInfoAlert, removeAlert, removeInfoAlert, clearAlertAll } =
  alertSlice.actions;

export const alertSliceReducer = alertSlice.reducer;
