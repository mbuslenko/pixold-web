import { TypedUseSelectorHook } from 'react-redux';
import { store } from './store';

export type StoreRootState = ReturnType<typeof store.getState>;
export type StoreDispatch = typeof store.dispatch;
export type AppSelector = TypedUseSelectorHook<StoreRootState>;
