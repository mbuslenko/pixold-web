import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.scss';
import LoginPage from './pages/loginPage/LoginPage';

import HomePage from './pages/homepage/HomePage';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate replace to="/auth" />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/auth" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
};
