import { Link } from 'react-router-dom';

import { Button } from '../../components/button/Button';

import './FaqHeader.scss';
import whiteLogoImg from '../../assets/svg/white-logo.svg';

export const FaqHeader: React.FC = () => {
  return (
    <header className='faq-header'>
      <img
        src={whiteLogoImg}
        className='faq-header-logo'
      />
      <nav>
        <Link
          to='/home'
          className='faq-header-link'
        >
          <Button
            text='Home'
            appearance={{ priority: 'primary', theme: 'black-white' }}
            addedClasses='faq-button-small'
          />
        </Link>
        <Link to='/auth'>
          <Button
            text='Get started'
            appearance={{ priority: 'primary', theme: 'black-white' }}
            addedClasses='faq-button-small'
          />
        </Link>
      </nav>
    </header>
  );
};
