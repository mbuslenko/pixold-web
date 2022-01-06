import { Link } from 'react-router-dom';

import { Button } from '../../components/button/Button';
import { LogoWithTextSvg } from '../../components/logoWithTextSvg/logoWithTextSvg';

import './FaqHeader.scss';

export const FaqHeader: React.FC = () => {
  return (
    <header className="faq-header">
      <LogoWithTextSvg color="white" className="faq-header-logo" />
      <nav>
        <Link to="/home" className="faq-header-link">
          <Button text="Home" appearance={{ priority: 'primary', theme: 'black-white' }} className="faq-button-small" />
        </Link>
        <Link to="/auth">
          <Button
            text="Get started"
            appearance={{ priority: 'primary', theme: 'black-white' }}
            className="faq-button-small"
          />
        </Link>
      </nav>
    </header>
  );
};
