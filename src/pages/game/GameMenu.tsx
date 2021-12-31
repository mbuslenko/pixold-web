import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { isSmallScreen } from '../../shared/ts/helperFunctions';

import './GameMenu.scss';
import logo from '../../assets/svg/logo.svg';

export const GameMenu: React.FC = () => {
  const [menuIsVisible, setMenuIsVisible] = useState<boolean>(true);

  useEffect(() => {
    if (isSmallScreen()) {
      setMenuIsVisible(false);
    }
  }, []);


  return (
    <div className='game-menu-wrapper'>
      <section className={`game-menu ${menuIsVisible && 'is-visible'}`}>
        <h2 className='game-menu-heading'>
          Navigate
        </h2>
        <nav className='game-menu-navigation'>
          <img
            className='game-menu-logo'
            src={logo}
          />
          <div className='game-menu-link-container'>
            <button
              className='game-menu-button territory-icon'
              onClick={() => console.log(';)')}
            >
              My territory
            </button>
            <Link
              className='game-menu-link players-icon'
              to='/players'
            >
              Players
            </Link>
            <Link
              className='game-menu-link redeem-icon'
              to='/redeem'
            >
              Redeem
            </Link>
            <Link
              className='game-menu-link wallet-icon'
              to='/wallet'
            >
              Wallet
            </Link>
          </div>
          <div className='game-menu-link-container'>
            <Link
              className='game-menu-link faq-icon'
              to='/faq'
            >
              FAQ
            </Link>
            <Link
              className='game-menu-link settings-icon'
              to='/settings'
            >
              Settings
            </Link>
          </div>
        </nav>
        <img
          src={logo}
          className='game-menu-logo-small'
        />
      </section>
      <button
        className={`game-menu-button show-menu-button ${menuIsVisible && 'is-active'}`}
        onClick={() => setMenuIsVisible(!menuIsVisible)}
      />
    </div>
  );
};
