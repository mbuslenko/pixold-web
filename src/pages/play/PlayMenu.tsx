import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { isScreen, redirect } from '../../shared/ts/helperFunctions';
import { ScreenMaxWidth } from '../../shared/ts/enums';

import { PlayMenuIconSvg } from '../../components/playMenuIconSvg/PlayMenuIconSvg';
import { PlayMenuShowIconSvg } from '../../components/playMenuShowIconSvg/PlayMenuShowIconSvg';

import './PlayMenu.scss';
import logo from '../../assets/svg/logo.svg';
import { IPlayMenuCallback } from './interfaces';

export const PlayMenu: React.FC<IPlayMenuCallback> = ({ showMyTerritoryCallback }) => {
  const navigate = useNavigate();
  const [menuIsVisible, setMenuIsVisible] = useState<boolean>(false);

  const showMenuCallback = () => {
    if (isScreen(ScreenMaxWidth.MEDIUM)) {
      setMenuIsVisible(false);

      return;
    }

    setMenuIsVisible(true);
  };

  useEffect(() => {
    showMenuCallback();
    window.addEventListener('resize', showMenuCallback);

    return () => {
      window.removeEventListener('resize', showMenuCallback);
    };
  }, []);

  return (
    <div className="play-menu-wrapper">
      <section className={`play-menu ${menuIsVisible && 'is-visible'}`}>
        <h2 className="play-menu-heading">Navigate</h2>
        <nav className="play-menu-navigation">
          <Link to="/home">
            <object className="play-menu-logo" data={logo} type="image/svg+xml" title="Logo" />
          </Link>
          <div className="play-menu-link-container">
            <button className="play-menu-button" onClick={showMyTerritoryCallback}>
              <PlayMenuIconSvg iconName="territory" className="play-menu-icon" />
              My territory
            </button>
            <Link className="play-menu-link" to="/players">
              <PlayMenuIconSvg iconName="players" className="play-menu-icon" />
              Players
            </Link>
            <Link className="play-menu-link" to="/redeem">
              <PlayMenuIconSvg iconName="redeem" className="play-menu-icon" />
              Redeem
            </Link>
            {/* TODO: change <a> to something else */}
            <a className="play-menu-link" onClick={() => redirect(navigate, '/wallet')}>
              <PlayMenuIconSvg iconName="wallet" className="play-menu-icon" />
              Wallet
            </a>
          </div>
          <div className="play-menu-link-container">
            <Link className="play-menu-link" to="/faq">
              <PlayMenuIconSvg iconName="faq" className="play-menu-icon" />
              FAQ
            </Link>
            <Link className="play-menu-link" to="/settings">
              <PlayMenuIconSvg iconName="settings" className="play-menu-icon" />
              Settings
            </Link>
          </div>
        </nav>
        <img src={logo} className="play-menu-logo-small" alt="logo" />
      </section>
      <button
        className={`play-menu-button show-menu-button ${menuIsVisible && 'is-active'}`}
        onClick={() => setMenuIsVisible(!menuIsVisible)}
      >
        <PlayMenuShowIconSvg className="show-menu-button-icon" color={menuIsVisible ? 'white' : 'purple'} />
      </button>
    </div>
  );
};
