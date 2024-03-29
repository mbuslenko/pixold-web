import './WalletBalanceContainer.scss';
import { WalletBalance } from './WalletBalance';
import { IWalletBalanceContainerProps } from '../interfaces';

export const WalletBalanceContainer: React.FC<IWalletBalanceContainerProps> = ({ pxl, xlm, usd }) => {
  return (
    <section>
      <h2 className="wallet-balance-heading">Your balance</h2>
      <div className="wallet-balance-container">
        <WalletBalance currency="PXL" balance={pxl} />
        <WalletBalance currency="XLM" balance={xlm} />
        <WalletBalance currency="USD" balance={usd} />
      </div>
    </section>
  );
};
