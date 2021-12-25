import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.scss';
import { Faq } from './pages/faq/Faq';
import { HomePage } from './pages/homepage/HomePage';
import LoginPage from './pages/loginPage/LoginPage';

import LoginPreloaderPage from './pages/preloaderPages/LoginPreloaderPage';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate replace to='/home'/>}/>
        <Route path='/home' element={<HomePage/>}/>
        <Route path='/faq' element={<Faq/>}/>
        <Route path="/auth" element={<LoginPage />} />
        <Route path="/auth/load" element={<LoginPreloaderPage />} />
      </Routes>
    </BrowserRouter>
  );
};
