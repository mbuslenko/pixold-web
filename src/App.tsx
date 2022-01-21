import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './App.scss';
import { CareersPage } from './pages/careers/CareersPage';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CareersPage />} />
      </Routes>
    </BrowserRouter>
  );
};
