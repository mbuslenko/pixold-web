import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import './App.scss';
import { CoinPage } from './pages/coin/CoinPage';
import { Error404Page } from './pages/errors/error404/Error404Page';
import { Error500Page } from './pages/errors/error500/Error500Page';
import { Faq } from './pages/faq/Faq';
import { HomePage } from './pages/home/HomePage';
import { Wallet } from './pages/wallet/components/Wallet';
import { WalletConnect } from './pages/walletConnect/WalletConnect';
import { LoginPage } from './pages/login/LoginPage';
import { LoginPreloaderPage } from './pages/preloader/LoginPreloaderPage';
import { UsernamePage } from './pages/username/UsernamePage';
import { TopPage } from './pages/topPage/TopPage';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate replace to="/home" />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/auth" element={<LoginPage />} />
        <Route path="/auth/load" element={<LoginPreloaderPage />} />
        <Route path="/coin" element={<CoinPage />} />
        <Route path="/wallet" element={<Wallet />} />
        <Route path="/wallet/connect" element={<WalletConnect />} /> // TODO: change to nested route
        <Route path="/players" element={<TopPage />} />
        <Route path="/username" element={<UsernamePage />} />
        <Route path="/500" element={<Error500Page />} />
        <Route path="*" element={<Error404Page />} />
      </Routes>
    </BrowserRouter>
  );
};
