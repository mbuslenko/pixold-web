import './WalletBalance.scss';
import dollarSignUrl from '../../../assets/svg/dollar-sign.svg';
import lumenLogoUrl from '../../../assets/svg/lumen-logo-purple.svg';
import pixelCoinLogoUrl from '../../../assets/svg/pixel-coin-logo-purple.svg';
import { WalletBalanceProps } from '../interfaces';
import { WalletBalanceCurrency } from '../types';

const balanceMaxLength = 6;

export const WalletBalance: React.FC<WalletBalanceProps> = ({ balance, currency }) => {
  const adjustBalanceLength = (balance: string): string => {
    if (balance.length <= balanceMaxLength) {
      return balance;
    }

    let newBalance: string = balance;

    newBalance = Number(newBalance).toFixed(newBalance.length - balanceMaxLength);
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
      case 'XML':
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
