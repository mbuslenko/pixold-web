import { Link } from 'react-router-dom';

import { Button } from '../../components/ui-kit/button/Button';

export const StartScreen: React.FC = () => {
  return (
    <div className="start-wrap">
      <section className="start">
        <h1 className="title">There will be a slogan</h1>
        <div className="wrap-btn">
          <Link to="/auth">
            <Button
              text="Get started"
              priority="primary"
              onClick={() => {
                console.log('');
              }}
            />
          </Link>
        </div>
      </section>
    </div>
  );
};
