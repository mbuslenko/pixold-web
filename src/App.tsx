import { useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { AlertContainer } from './components/alertContainer/AlertContainer';

import './App.scss';
import { CoinPage } from './pages/coin/CoinPage';
import { Error404Page } from './pages/errors/error404/Error404Page';
import { Error500Page } from './pages/errors/error500/Error500Page';
import { FaqPage } from './pages/faq/FaqPage';
import { HomePage } from './pages/home/HomePage';
import { WalletPage } from './pages/wallet/WalletPage';
import { WalletConnectPage } from './pages/walletConnect/WalletConnectPage';
import { AuthPage } from './pages/auth/AuthPage';
import { AuthLoadPage } from './pages/authLoad/AuthLoadPage';
import { UsernamePage } from './pages/username/UsernamePage';
import { PlayersPage } from './pages/players/PlayersPage';
import { SettingsPage } from './pages/settings/SettingsPage';
import { PlayPage } from './pages/play/PlayPage';
import { RedeemCode } from './pages/redeemCode/RedeemCode';
import { connectSocket } from './shared/ts/clientCommunication';
import { useAppDispatch, useAppSelector } from './store/store';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();

  const accessToken = useAppSelector((state) => state.user.accessToken);

  useEffect(() => {
    if (accessToken) {
      connectSocket(dispatch, accessToken);
    }
  }, [dispatch, accessToken]);

  console.log('APP render');

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate replace to="/home" />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/faq" element={<FaqPage />}>
            <Route path=":questionId" />
          </Route>
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/auth/load" element={<AuthLoadPage />} />
          <Route path="/coin" element={<CoinPage />} />
          <Route path="/wallet" element={<WalletPage />} />
          <Route path="/wallet/connect" element={<WalletConnectPage />} />
          <Route path="/play" element={<PlayPage />} />
          <Route path="/players" element={<PlayersPage />} />
          <Route path="/username" element={<UsernamePage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/redeem" element={<RedeemCode />} />
          <Route path="/500" element={<Error500Page />} />
          <Route path="*" element={<Error404Page />} />
        </Routes>
      </BrowserRouter>
      <AlertContainer />
    </>
  );
};
