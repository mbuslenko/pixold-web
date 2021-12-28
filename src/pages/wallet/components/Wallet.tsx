import { AxiosResponse } from 'axios';

import { useState } from 'react';

import { AxiosInstance } from '../../../components/AxiosInstance';

import { WalletSwitch } from './WalletSwitch';
import { WalletHeader } from './WalletHeader';
import { WalletBalanceContainer } from './WalletBalanceContainer';

import './Wallet.scss';
import walletPageBackgroundImg from '../../../assets/svg/wallet-page-background.svg';

export const Wallet: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [pxl, setPxl] = useState<string>('0');
  const [xlm, setXlm] = useState<string>('0');
  const [usd, setUsd] = useState<string>('0');

  const getUserResponseCallback = (response: AxiosResponse): void => {
    const { username, balanceInUSD, balanceInXLM, balanceInPXL } = response.data;

    setUsername(username);
    setPxl(balanceInPXL);
    setXlm(balanceInXLM);
    setUsd(balanceInUSD);
  };

  return (
    <section className='wallet-page'>
      <WalletHeader username={username}/>
      <main className='wallet-page-main'>
        <WalletBalanceContainer
          pxl={pxl}
          xlm={xlm}
          usd={usd}
        />
        <WalletSwitch onSubmit={() => console.log('switch submit')}/>
      </main>
      <img
        className='wallet-page-background'
        src={walletPageBackgroundImg}
      />
      <AxiosInstance
        requestUrl='/wallet'
        requestMethod='get'
        responseCallback={getUserResponseCallback}
      />
    </section>
  );
};
