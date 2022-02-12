import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { IGetResponseWallet } from '../../shared/ts/interfaces';

import './WalletPage.scss';
import { WalletSwitch } from './WalletSwitch';
import { WalletHeader } from './WalletHeader';
import { WalletBalanceContainer } from './WalletBalanceContainer';
import { prepareRequest } from '../../shared/ts/clientCommunication';
import { useDispatch } from 'react-redux';

export const WalletPage: React.FC = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [username, setUsername] = useState<string>('');
  const [pxl, setPxl] = useState<number>(0);
  const [xlm, setXlm] = useState<number>(0);
  const [usd, setUsd] = useState<number>(0);

  const setUserWallet = (wallet: IGetResponseWallet): void => {
    const { username, balanceInUSD, balanceInXLM, balanceInPXL } = wallet;

    setUsername(username);
    setPxl(balanceInPXL);
    setXlm(balanceInXLM);
    setUsd(balanceInUSD);

    localStorage.setItem('wallet', JSON.stringify(wallet));
  };

  useEffect(() => {
    const errorCallback = (error: any): void => {
      if (error.response.status === 400) {
        navigate('/coin', { replace: true });
      }
    };

    const wallet = localStorage.getItem('wallet');

    if (!wallet) {
      navigate('/coin', { replace: true });

      return;
    }

    setUserWallet(JSON.parse(wallet as string));

    prepareRequest(
      navigate,
      dispatch,
    )({
      requestConfig: {
        url: '/wallet',
        method: 'get',
      },
      onResponse: (response) => setUserWallet(response.data),
      onError: errorCallback,
    });
  }, [dispatch, navigate]);

  return (
    <section className="wallet-page">
      <WalletHeader username={username} />
      <main className="wallet-page-main">
        <WalletBalanceContainer pxl={pxl} xlm={xlm} usd={usd} />
        <WalletSwitch onSubmit={() => console.log('switch submit')} />
      </main>
      <div className="wallet-page-background" />
    </section>
  );
};
