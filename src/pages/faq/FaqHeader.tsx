import { Link, useNavigate } from 'react-router-dom';

import { redirect } from '../../shared/ts/helperFunctions';

import { Button } from '../../components/button/Button';
import { LogoWithTextSvg } from '../../components/logoWithTextSvg/logoWithTextSvg';

import './FaqHeader.scss';

export const FaqHeader: React.FC = () => {
  const navigate = useNavigate();

  return (
    <header className="faq-header">
      <LogoWithTextSvg color="white" className="faq-header-logo" />
      <nav>
        <Link to="/home" className="faq-header-link">
          <Button text="Home" appearance={{ priority: 'primary', theme: 'black-white' }} className="faq-button-small" />
        </Link>
        <Button
          text="Play"
          onClick={() => redirect(navigate, '/play')}
          appearance={{ priority: 'primary', theme: 'black-white' }}
          className="faq-button-small"
        />
      </nav>
    </header>
  );
};
