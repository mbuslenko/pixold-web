import { AlertInfo } from '../components/types';

export interface IStoreAlertState {
  isShownAttackAlert: boolean;
  infoAlertAll: Omit<AlertInfo, 'type'>[];
  alertAll: AlertInfo[];
}

export interface IStoreSocketState {
  isSocketConnected: boolean;
}
