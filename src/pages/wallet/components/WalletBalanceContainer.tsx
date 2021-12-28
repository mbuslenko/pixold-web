import { WalletBalanceContainerProps } from '../interfaces';
import { WalletBalance } from './WalletBalance';

import './WalletBalanceContainer.scss';

export const WalletBalanceContainer: React.FC<WalletBalanceContainerProps> = ({ wallets }) => {
  return (
    <section className='wallet-balance-container'>
      <h2 className='wallet-balance-heading'>
        Your balance
      </h2>
      <div className='wallet-container'>
        { wallets.map((value, index) => <WalletBalance {...value} key={index} />) }
      </div>
    </section>
  );
};
