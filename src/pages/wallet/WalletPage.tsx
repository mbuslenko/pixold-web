import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { IGetResponseWallet } from '../../shared/ts/interfaces';

import './WalletPage.scss';
import { WalletSwitch } from './WalletSwitch';
import { WalletHeader } from './WalletHeader';
import { WalletBalanceContainer } from './WalletBalanceContainer';
import { prepareRequest } from '../../shared/ts/clientCommunication';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { setUsername, setUserWallet } from '../../store/userSlice';

export const WalletPage: React.FC = () => {
  const dispatch = useAppDispatch();

  const wallet = useAppSelector((state) => state.user.wallet);

  const navigate = useNavigate();

  const [pxl, setPxl] = useState<number>(wallet?.balanceInPXL ?? 0);
  const [xlm, setXlm] = useState<number>(wallet?.balanceInXLM ?? 0);
  const [usd, setUsd] = useState<number>(wallet?.balanceInUSD ?? 0);

  if (!wallet) {
    navigate('/coin', { replace: true });
  }

  useEffect(() => {
    const updateWallet = (wallet: IGetResponseWallet): void => {
      const { username, balanceInUSD, balanceInXLM, balanceInPXL } = wallet;

      setPxl(balanceInPXL);
      setXlm(balanceInXLM);
      setUsd(balanceInUSD);

      dispatch(setUsername(username));
      dispatch(setUserWallet(wallet));
    };

    const errorCallback = (error: any): void => {
      if (error.response.status === 400) {
        navigate('/coin', { replace: true });
      }
    };

    prepareRequest(
      navigate,
      dispatch,
    )({
      requestConfig: {
        url: '/wallet',
        method: 'get',
      },
      onResponse: (response) => updateWallet(response.data),
      onError: errorCallback,
    });
  }, [dispatch, navigate]);

  return (
    <section className="wallet-page">
      <WalletHeader />
      <main className="wallet-page-main">
        <WalletBalanceContainer pxl={pxl} xlm={xlm} usd={usd} />
        <WalletSwitch onSubmit={() => console.log('switch submit')} />
      </main>
      <div className="wallet-page-background" />
    </section>
  );
};
