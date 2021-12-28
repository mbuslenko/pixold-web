import { WalletBalance } from './WalletBalance';
import { WalletBalanceContainerProps } from '../interfaces';

import './WalletBalanceContainer.scss';

export const WalletBalanceContainer: React.FC<WalletBalanceContainerProps> = ({ pxl, xlm, usd }) => {
  return (
    <section className='wallet-balance-container'>
      <h2 className='wallet-balance-heading'>
        Your balance
      </h2>
      <div className='wallet-container'>
        <WalletBalance currency='PXL' balance={pxl}/>
        <WalletBalance currency='XLM' balance={xlm}/>
        <WalletBalance currency='USD' balance={usd}/>
      </div>
    </section>
  );
};
