import { WalletBalanceCurrency } from './types';

export interface WalletBalanceProps {
  balance: string;
  currency: WalletBalanceCurrency;
}

export interface WalletHeaderProps {
  username: string;
}

export interface WalletBalanceContainerProps {
  wallets: WalletBalanceProps[]
}

export interface WalletSwitchProps {
  onSubmit: () => void
}
