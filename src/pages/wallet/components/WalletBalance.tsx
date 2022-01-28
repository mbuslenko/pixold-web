import { PixelCoinLogoSvg } from '../../../components/pixelCoinLogoSvg/PixelCoinLogoSvg';
import { LumenLogoSvg } from '../../../components/lumenLogoSvg/LumenLogoSvg';
import { NumberAnimation } from '../../../components/numberAnimation/NumberAnimation';

import './WalletBalance.scss';
import dollarSignImg from '../../../assets/svg/dollar-sign.svg';
import { IWalletBalanceNumber, IWalletBalanceProps } from '../interfaces';
import { WalletBalanceCurrency } from '../types';

const balanceMaxLength = 6;
const textSliceEnd = balanceMaxLength - 1;
const balanceOverflow = '...';

export const WalletBalance: React.FC<IWalletBalanceProps> = ({ balance, currency }) => {
  const adjustBalanceLength = (balance: number): IWalletBalanceNumber => {
    const balanceText: string = balance.toString();
    const balanceDigitCount: number = balance.toString().replace('.', '').length;

    if (balanceDigitCount <= balanceMaxLength) {
      return { number: balance, overflow: '' };
    }

    if (Number.isInteger(balance)) {
      return { number: Number(balanceText.slice(0, textSliceEnd)), overflow: balanceOverflow };
    }

    if (balanceText.indexOf('.') < textSliceEnd) {
      return { number: Number(balanceText.slice(0, textSliceEnd + 1)), overflow: balanceOverflow };
    }

    return { number: Number(balanceText.slice(0, textSliceEnd)), overflow: balanceOverflow };
  };

  const getImgFromCurrency = (currency: WalletBalanceCurrency): JSX.Element => {
    switch (currency) {
      case 'PXL':
        return <PixelCoinLogoSvg className="wallet-balance-icon" color="purple" />;
      case 'USD':
        return <img className="wallet-balance-icon" alt="USD" src={dollarSignImg} />;
      case 'XLM':
        return <LumenLogoSvg className="wallet-balance-icon" color="purple" />;
    }
  };

  const { number, overflow } = adjustBalanceLength(balance);

  return (
    <div className="wallet-balance">
      {getImgFromCurrency(currency)}
      <span>
        <NumberAnimation number={number} />
        {`${overflow} ${currency}`}
      </span>
    </div>
  );
};
