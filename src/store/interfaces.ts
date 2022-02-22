import { AlertInfo } from '../components/types';
import { IPostDataAuth } from '../shared/ts/interfaces';

export interface IStoreAlertState {
  isShownAttackAlert: boolean;
  infoAlertAll: Omit<AlertInfo, 'type'>[];
  alertAll: AlertInfo[];
}

export interface IStoreSocketState {
  isSocketConnected: boolean;
}

export interface IStoreUserSlice {
  postDataAuth: IPostDataAuth | null;
  accessToken: string | null;
  userId: string | null;
  username: string | null;
  wallet: {
    balanceInUSD: number;
    balanceInXLM: number;
    balanceInPXL: number;
  } | null;
}
