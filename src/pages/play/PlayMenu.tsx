import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { isScreen } from '../../shared/ts/helperFunctions';
import { ScreenMaxWidth } from '../../shared/ts/enums';

import { PlayMenuIconSvg } from '../../components/playMenuIconSvg/PlayMenuIconSvg';
import { PlayMenuShowIconSvg } from '../../components/playMenuShowIconSvg/PlayMenuShowIconSvg';

import './PlayMenu.scss';
import logo from '../../assets/svg/logo.svg';

export const PlayMenu: React.FC = () => {
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
            <img className="play-menu-logo" src={logo} alt="logo" />
          </Link>
          <div className="play-menu-link-container">
            <button className="play-menu-button" onClick={() => console.log(';)')}>
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
            <Link className="play-menu-link" to="/wallet">
              <PlayMenuIconSvg iconName="wallet" className="play-menu-icon" />
              Wallet
            </Link>
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
