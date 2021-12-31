import { Link } from 'react-router-dom';

import { Button } from '../../components/button/Button';

export const StartScreen: React.FC = () => {
  return (
    <div className="start-wrap">
      <section className="start">
        <h1 className="title">There will be a slogan</h1>
        <div className="wrap-btn">
          <Link to='/auth'>
            <Button
              text="Get started"
              appearance={{ priority: 'primary' }}
            />
          </Link>
        </div>
      </section>
    </div>
  );
};
