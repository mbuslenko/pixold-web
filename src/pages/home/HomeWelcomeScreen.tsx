import { Link } from 'react-router-dom';

import { Button } from '../../components/button/Button';

import logoImg from '../../assets/svg/logo.svg';
import './HomeWelcomeScreen.scss';

export const HomeWelcomeScreen: React.FC = () => {
  return (
    <div className="home-start-wrapper">
      <div className="home-start">
        <img src={logoImg} alt="logo" />
        <h1 className="home-start-title">A place where time is really money</h1>
        <Link to="/auth">
          <Button text="Get started" appearance={{ priority: 'primary' }} />
        </Link>
      </div>
    </div>
  );
};
