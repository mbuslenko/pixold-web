import { adjustDecimalLength } from '../../shared/ts/helperFunctions';

import { PixelCoinLogoSvg } from '../../components/pixelCoinLogoSvg/PixelCoinLogoSvg';
import { LumenLogoSvg } from '../../components/lumenLogoSvg/LumenLogoSvg';
import { NumberAnimation } from '../../components/numberAnimation/NumberAnimation';

import './WalletBalance.scss';
import dollarSignImg from '../../assets/svg/dollar-sign.svg';
import { IWalletBalanceNumber, IWalletBalanceProps } from './interfaces';
import { WalletBalanceCurrency } from './types';

const balanceMaxLength = 5;
const balanceOverflow = '...';

const adjustNumberLength = (number: number): IWalletBalanceNumber => {
  const numberLength = balanceMaxLength + (Number.isInteger(number) ? 0 : 1);

  if (number.toString().length <= numberLength) {
    return { number, overflow: '' };
  }

  const integerString = Math.floor(number).toString();

  if (integerString.length >= balanceMaxLength) {
    return { number: Number(integerString.slice(0, balanceMaxLength)), overflow: balanceOverflow };
  }

  return {
    number: Number(adjustDecimalLength(number, balanceMaxLength - integerString.length)),
    overflow: balanceOverflow,
  };
};

const getImgFromCurrency = (currency: WalletBalanceCurrency): JSX.Element => {
  switch (currency) {
    case 'PXL':
      return <PixelCoinLogoSvg className="wallet-balance-icon" color="purple" />;
    case 'USD':
      return <img className="wallet-balance-icon" alt="" src={dollarSignImg} />;
    case 'XLM':
      return <LumenLogoSvg className="wallet-balance-icon" color="purple" />;
  }
};

export const WalletBalance: React.FC<IWalletBalanceProps> = ({ balance, currency }) => {
  const { number, overflow } = adjustNumberLength(balance);

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
