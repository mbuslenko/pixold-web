import { PixelCoinLogoSvg } from '../../../components/pixelCoinLogoSvg/PixelCoinLogoSvg';
import { LumenLogoSvg } from '../../../components/lumenLogoSvg/LumenLogoSvg';

import './WalletBalance.scss';
import dollarSignImg from '../../../assets/svg/dollar-sign.svg';
import { WalletBalanceProps } from '../interfaces';
import { WalletBalanceCurrency } from '../types';

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

  const getImgFromCurrency = (currency: WalletBalanceCurrency): JSX.Element => {
    switch (currency) {
      case 'PXL':
        return <PixelCoinLogoSvg className='wallet-balance-icon' color='purple' />;
      case 'USD':
        return <img className='wallet-balance-icon' src={dollarSignImg} />;
      case 'XLM':
        return <LumenLogoSvg className='wallet-balance-icon' color='purple' />;
    }
  };

  return (
    <div className="wallet-balance">
      {getImgFromCurrency(currency)}
      <span>{`${adjustBalanceLength(balance)} ${currency}`}</span>
    </div>
  );
};
