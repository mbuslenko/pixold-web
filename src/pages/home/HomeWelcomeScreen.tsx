import { useNavigate } from 'react-router-dom';

import { redirect } from '../../shared/ts/helperFunctions';

import { Button } from '../../components/button/Button';

import logoImg from '../../assets/svg/logo.svg';
import './HomeWelcomeScreen.scss';

export const HomeWelcomeScreen: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="home-welcome-screen-wrapper">
      <div className="home-welcome-screen">
        <img src={logoImg} alt="logo" className="home-welcome-logo" />
        <h1 className="home-welcome-title">A place where time is really money</h1>
        <Button text="Get started" appearance={{ priority: 'primary' }} onClick={() => redirect(navigate, '/play')} />
      </div>
    </div>
  );
};
