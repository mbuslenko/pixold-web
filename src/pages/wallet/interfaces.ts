import { WalletBalanceCurrency } from './types';

export interface WalletBalanceProps {
  balance: string;
  currency: WalletBalanceCurrency;
}

export interface WalletHeaderProps {
  username: string;
}

export interface WalletBalanceContainerProps {
  pxl: string;
  xlm: string;
  usd: string;
}

export interface WalletSwitchProps {
  onSubmit: () => void
}
