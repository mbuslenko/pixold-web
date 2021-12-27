import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.scss';
import { Error404Page } from './pages/errorsPages/error404Page/Error404Page';
import { Error500Page } from './pages/errorsPages/error500Page/Error500Page';
import { Faq } from './pages/faq/Faq';
import { HomePage } from './pages/homepage/HomePage';
import LoginPage from './pages/loginPage/LoginPage';

import LoginPreloaderPage from './pages/preloaderPages/LoginPreloaderPage';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate replace to="/home" />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/auth" element={<LoginPage />} />
        <Route path="/auth/load" element={<LoginPreloaderPage />} />
        <Route path="*" element={<Error404Page />} />
        <Route path="" element={<Error500Page />} />
      </Routes>
    </BrowserRouter>
  );
};
