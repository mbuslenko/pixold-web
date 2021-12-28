
import { WalletBalanceProps } from '../interfaces';
import { WalletBalanceCurrency } from '../types';

import './WalletBalance.scss';
import dollarSignUrl from '../../../assets/svg/dollar-sign.svg';
import lumenLogoUrl from '../../../assets/svg/lumen-logo-purple.svg';
import pixelCoinLogoUrl from '../../../assets/svg/pixel-coin-logo-purple.svg';

const balanceMaxLength = 6;

export const WalletBalance: React.FC<WalletBalanceProps> = ({ balance, currency }) => {
  const adjustBalanceLength = (balance: string): string => {
    if (balance.length <= balanceMaxLength) {
      return balance;
    }

    const newBalance: string = Number(balance).toFixed(balance.length - balanceMaxLength);

    if (newBalance.length <= balanceMaxLength) {
      return newBalance;
    }

    return newBalance.slice(0, balanceMaxLength + 1);
  };
  const getLogoUrlFromCurrency = (currency: WalletBalanceCurrency): string => {
    switch (currency) {
      case 'PXL':
        return pixelCoinLogoUrl;
      case 'USD':
        return dollarSignUrl;
      case 'XLM':
        return lumenLogoUrl;
    }
  };

  return (
    <div className='wallet-balance'>
      <img
        className='wallet-balance-icon'
        src={getLogoUrlFromCurrency(currency)}
      />
      <span>
        {`${adjustBalanceLength(balance)} ${currency}`}
      </span>
    </div>
  );
};
