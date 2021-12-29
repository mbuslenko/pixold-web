import { WalletBalanceProps } from '../interfaces';
import { WalletBalanceCurrency } from '../types';

import './WalletBalance.scss';
import dollarSignUrl from '../../../assets/svg/dollar-sign.svg';
import lumenLogoUrl from '../../../assets/svg/lumen-logo-purple.svg';
import pixelCoinLogoUrl from '../../../assets/svg/pixel-coin-logo-purple.svg';

const balanceMaxLength = 6;
const textSliceEnd = balanceMaxLength - 1;
const balanceOverflow = '...';

export const WalletBalance: React.FC<WalletBalanceProps> = ({ balance, currency }) => {
  const adjustBalanceLength = (balance: number): string => {
    const balanceText: string = balance.toString();
    const balanceDigitCount: number = balance.toString().replace('.', '').length;

    if (balanceDigitCount <= balanceMaxLength) {
      return balanceText;
    }

    if (Number.isInteger(balance)) {
      return balanceText.slice(0, textSliceEnd) + balanceOverflow;
    }

    if (balanceText.indexOf('.') < textSliceEnd) {
      return balanceText.slice(0, textSliceEnd + 1) + balanceOverflow;
    }

    return balanceText.slice(0, textSliceEnd) + balanceOverflow;
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
    <div className="wallet-balance">
      <img className="wallet-balance-icon" src={getLogoUrlFromCurrency(currency)} />
      <span>{`${adjustBalanceLength(balance)} ${currency}`}</span>
    </div>
  );
};
