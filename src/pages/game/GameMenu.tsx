import { Link } from 'react-router-dom';

import logo from '../../assets/svg/logo.svg';
import territoryIcon from '../../assets/svg/territory-icon.svg';
import playersIcon from '../../assets/svg/players-icon.svg';
import redeemIcon from '../../assets/svg/redeem-icon.svg';
import walletIcon from '../../assets/svg/wallet-icon.svg';
import faqIcon from '../../assets/svg/faq-icon.svg';
import settingsIcon from '../../assets/svg/settings-icon.svg';
import menuButtonIcon from '../../assets/svg/game-menu-button-icon.svg';
import './GameMenu.scss';

export const GameMenu: React.FC = () => {
  return (
    <section className='menu'>
      <h2 className='menu-heading'>
        Navigate
      </h2>
      <img
        className='menu-logo'
        src={logo}
      />
      <div className='menu-link-container'>
        <Link className='menu-link' to=''>
          <img src={territoryIcon} />
          <p>My territory</p>
        </Link>
        <Link className='menu-link' to='/players'>
          <img src={playersIcon} />
          <p>Players</p>
        </Link>
        <Link className='menu-link' to='/redeem'>
          <img src={redeemIcon} />
          <p>Redeem</p>
        </Link>
        <Link className='menu-link' to='/wallet'>
          <img src={walletIcon} />
          <p>Wallet</p>
        </Link>
      </div>
      <div className='menu-link-container'>
        <Link className='menu-link' to='/faq'>
          <img src={faqIcon} />
          <p>FAQ</p>
        </Link>
        <Link className='menu-link' to=''>
          <img src={settingsIcon} />
          <p>Settings</p>
        </Link>
      </div>
      <button className='menu-show-button'>
        <img src={menuButtonIcon} />
      </button>
    </section>
  );
};
