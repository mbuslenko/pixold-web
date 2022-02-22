import { WalletBalanceCurrency } from './types';

export interface IWalletBalanceProps {
  balance: number;
  currency: WalletBalanceCurrency;
}

export interface IWalletBalanceContainerProps {
  pxl: number;
  xlm: number;
  usd: number;
}

export interface IWalletSwitchProps {
  onSubmit: () => void;
}

export interface IWalletBalanceNumber {
  number: number;
  overflow: string;
}
