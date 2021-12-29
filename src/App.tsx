import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { CoinPage } from './pages/coinPage/CoinPage';
import { Error404Page } from './pages/errorsPages/error404Page/Error404Page';
import { Error500Page } from './pages/errorsPages/error500Page/Error500Page';
import { Faq } from './pages/faq/Faq';
import { HomePage } from './pages/homepage/HomePage';
import { WalletConnect } from './pages/walletConnect/WalletConnect';
import { LoginPage } from './pages/loginPage/LoginPage';
import { LoginPreloaderPage } from './pages/preloaderPages/LoginPreloaderPage';
import { TopPage } from './pages/topPage/TopPage';

import './App.scss';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate replace to="/score" />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/auth" element={<LoginPage />} />
        <Route path="/auth/load" element={<LoginPreloaderPage />} />
        <Route path="/coin" element={<CoinPage />} />
        <Route path="/wallet">
          <Route path="connect" element={<WalletConnect />} />
        </Route>
        <Route path="/score" element={<TopPage />} />
        <Route path="/500" element={<Error500Page />} />
        <Route path="*" element={<Error404Page />} />
      </Routes>
    </BrowserRouter>
  );
};
