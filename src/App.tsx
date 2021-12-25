import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.scss';
import { CoinPage } from './pages/coinPage/CoinPage';
import { Faq } from './pages/faq/Faq';
import { HomePage } from './pages/homepage/HomePage';
import { WalletConnect } from './pages/walletConnect/WalletConnect';
import LoginPage from './pages/loginPage/LoginPage';

import LoginPreloaderPage from './pages/preloaderPages/LoginPreloaderPage';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate replace to='/wallet/connect'/>}/>
        <Route path='/home' element={<HomePage/>}/>
        <Route path='/faq' element={<Faq/>}/>
        <Route path='/coin' element={<CoinPage/>}/>
        <Route path='/wallet'>
          <Route path='connect' element={<WalletConnect/>}/>
        </Route>
        <Route path="/auth" element={<LoginPage />}/>
        <Route path='/auth/load' element={<LoginPreloaderPage/>}/>
      </Routes>
    </BrowserRouter>
  );
};
