import './Wallet.scss';
import walletPageBackgroundImg from '../../../assets/svg/wallet-page-background.svg';
import { WalletSwitch } from './WalletSwitch';
import { WalletHeader } from './WalletHeader';
import { WalletBalanceContainer } from './WalletBalanceContainer';
import { WalletBalanceProps } from '../interfaces';

const testWallets: WalletBalanceProps[] = [
  { currency: 'PXL', balance: '10000.0000000000' },
  { currency: 'USD', balance: '451211122222212.222' },
  { currency: 'XML', balance: '20' },
];

export const Wallet: React.FC = () => {
  return (
    <section className='wallet-page'>
      <WalletHeader username='12345asdasdasd_678_90'/>
      <main className='wallet-page-main'>
        <WalletBalanceContainer wallets={testWallets}/>
        <WalletSwitch onSubmit={() => console.log('switch submit')}/>
      </main>
      <img
        className='wallet-page-background'
        src={walletPageBackgroundImg}
      />
    </section>
  );
};
