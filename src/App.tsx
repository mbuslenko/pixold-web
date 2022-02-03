import { useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { AlertContainer } from './components/alertContainer/AlertContainer';

import './App.scss';
import { CoinPage } from './pages/coin/CoinPage';
import { Error404Page } from './pages/errors/error404/Error404Page';
import { Error500Page } from './pages/errors/error500/Error500Page';
import { FaqPage } from './pages/faq/FaqPage';
import { HomePage } from './pages/home/HomePage';
import { WalletPage } from './pages/wallet/components/WalletPage';
import { WalletConnectPage } from './pages/walletConnect/WalletConnectPage';
import { AuthPage } from './pages/auth/AuthPage';
import { AuthLoadPage } from './pages/authLoad/AuthLoadPage';
import { UsernamePage } from './pages/username/UsernamePage';
import { PlayersPage } from './pages/players/PlayersPage';
import { SettingsPage } from './pages/settings/SettingsPage';
import { PlayPage } from './pages/play/PlayPage';
import { RedeemCode } from './pages/redeemCode/RedeemCode';
import { client } from './shared/ts/ClientCommunication';

export const App: React.FC = () => {
  const [isAttackAlertsVisible, setIsAttackAlertsVisible] = useState(false);
  const [isConnectedSocket, setIsConnectedSocket] = useState(false);

  useEffect(() => {
    client.onSocketConnect = () => setIsConnectedSocket(true);
    client.onSocketDisconnect = () => setIsConnectedSocket(false);
    client.connectSocket();
    console.log('connection');
  }, []);

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
          <Route path="/play" element={<PlayPage showAlertsCallback={setIsAttackAlertsVisible} />} />
          <Route path="/players" element={<PlayersPage />} />
          <Route path="/username" element={<UsernamePage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/redeem" element={<RedeemCode />} />
          <Route path="/500" element={<Error500Page />} />
          <Route path="*" element={<Error404Page />} />
        </Routes>
      </BrowserRouter>
      <AlertContainer isConnectedSocket={isConnectedSocket} showAttackAlerts={isAttackAlertsVisible} />
    </>
  );
};
