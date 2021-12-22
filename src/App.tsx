import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.scss';
import { Faq } from './pages/faq/Faq';
import { HomePage } from './pages/homepage/HomePage';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate replace to='/faq'/>}/>
        <Route path='/home' element={<HomePage/>}/>
        <Route path='/faq' element={<Faq/>}/>
      </Routes>
    </BrowserRouter>
  );
};
