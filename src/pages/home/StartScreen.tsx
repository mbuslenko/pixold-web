import { Link } from 'react-router-dom';

import { Button } from '../../components/button/Button';

import './StartScreen.scss';

export const StartScreen: React.FC = () => {
  return (
    <div className="home-start-wrap">
      <section className="home-start">
        <h1 className="home-start-title">There will be a slogan</h1>
        <Link to="/auth">
          <Button text="Get started" appearance={{ priority: 'primary' }} />
        </Link>
      </section>
    </div>
  );
};
