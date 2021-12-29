import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAxiosInstance } from '../../../components/AxiosInstance';

import { WalletSwitch } from './WalletSwitch';
import { WalletHeader } from './WalletHeader';
import { WalletBalanceContainer } from './WalletBalanceContainer';

import './Wallet.scss';
import walletPageBackgroundImg from '../../../assets/svg/wallet-page-background.svg';
import { GetResponseWallet } from '../../../shared/ts/types';

export const Wallet: React.FC = () => {
  const navigate = useNavigate();
  const request = useAxiosInstance(navigate);
  const [username, setUsername] = useState<string>('');
  const [pxl, setPxl] = useState<number>(0);
  const [xlm, setXlm] = useState<number>(0);
  const [usd, setUsd] = useState<number>(0);

  const getUserResponseCallback = (response: GetResponseWallet): void => {
    const { username, balanceInUSD, balanceInXLM, balanceInPXL } = response.data;

    setUsername(username);
    setPxl(balanceInPXL);
    setXlm(balanceInXLM);
    setUsd(balanceInUSD);
  };

  const errorCallback = (error: any): void => {
    if (error.response.status === 400) {
      navigate('/coin');
    }
  };

  useEffect(() => {
    request({
      requestUrl: '/wallet',
      requestMethod: 'get',
      responseCallback: getUserResponseCallback,
      errorCallback: errorCallback,
    });
  }, []);

  return (
    <section className="wallet-page">
      <WalletHeader username={username} />
      <main className="wallet-page-main">
        <WalletBalanceContainer pxl={pxl} xlm={xlm} usd={usd} />
        <WalletSwitch onSubmit={() => console.log('switch submit')} />
      </main>
      <img className="wallet-page-background" src={walletPageBackgroundImg} />
    </section>
  );
};
