import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPostDataAuth, IPostResponseAuth, IPostResponseWalletConnect } from '../shared/ts/interfaces';
import { IStoreUserSlice } from './interfaces';

const wallet = localStorage.getItem('wallet');

const initialState: IStoreUserSlice = {
  postDataAuth: null,
  accessToken: localStorage.getItem('accessToken'),
  userId: localStorage.getItem('userId'),
  username: localStorage.getItem('username'),
  wallet: wallet ? JSON.parse(wallet) : null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setPostDataAuth(state, action: PayloadAction<IPostDataAuth>): void {
      state.postDataAuth = action.payload;
    },

    setUserInfo(state, action: PayloadAction<Omit<IPostResponseAuth, 'updateUsername'>>): void {
      const { accessToken, userId, username, wallet } = action.payload;

      state.accessToken = accessToken;
      state.userId = userId;
      state.username = username;
      state.wallet = wallet;

      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('userId', userId);
      localStorage.setItem('username', username);
      if (wallet) {
        localStorage.setItem('wallet', JSON.stringify(wallet));
      }
    },

    setUsername(state, action: PayloadAction<string>): void {
      state.username = action.payload;
    },

    setUserWallet(state, action: PayloadAction<Omit<IPostResponseWalletConnect, 'id'>>): void {
      state.wallet = action.payload;

      localStorage.setItem('wallet', JSON.stringify(action.payload));
    },

    clearUserInfo(state): void {
      state.accessToken = null;
      state.userId = null;
      state.username = null;
      state.wallet = null;

      localStorage.clear();
    },
  },
});

export const { setPostDataAuth, setUserInfo, setUsername, setUserWallet, clearUserInfo } = userSlice.actions;

export const userSliceReducer = userSlice.reducer;
