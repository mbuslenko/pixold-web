import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.scss';
import HomePage from './pages/homepage/HomePage';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate replace to='/home'/>}/>
        <Route path='/home' element={<HomePage />}/>
      </Routes>
    </BrowserRouter>
  );
};
