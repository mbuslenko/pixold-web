import { WalletBalanceCurrency } from './types';

export interface WalletBalanceProps {
  balance: number;
  currency: WalletBalanceCurrency;
}

export interface WalletHeaderProps {
  username: string;
}

export interface WalletBalanceContainerProps {
  pxl: number;
  xlm: number;
  usd: number;
}

export interface WalletSwitchProps {
  onSubmit: () => void
}
