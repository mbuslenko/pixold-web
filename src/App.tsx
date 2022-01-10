import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import './App.scss';
import { HomePage } from './pages/home/HomePage';
import { Error404Page } from './pages/errors/error404/Error404Page';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate replace to="/home" />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="*" element={<Error404Page />} />
      </Routes>
    </BrowserRouter>
  );
};
