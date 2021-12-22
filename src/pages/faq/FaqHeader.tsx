import { Link } from 'react-router-dom';
import { Button } from '../../components/ui-kit/button/Button';
import whiteLogoImg from '../../assets/svg/white-logo.svg';
import './FaqHeader.scss';

export const FaqHeader: React.FC = () => {
  return (
    <header className='faq-header'>
      <img
        src={whiteLogoImg}
        className='faq-header-logo'
      />
      <nav className='nav-container'>
        <div className='nav-link-wrapper'>
          <Link to='/home'>
            <Button
              text='Home'
              priority='primary'
              className='faq-primary-button-color'
            />
          </Link>
        </div>
        <Link to='/auth'>
          <Button
            text='Get started'
            priority='primary'
            className='faq-primary-button-color'
          />
        </Link>
      </nav>
    </header>
  );
};
