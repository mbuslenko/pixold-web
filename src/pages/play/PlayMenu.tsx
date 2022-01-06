import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { isScreen } from '../../shared/ts/helperFunctions';
import { ScreenMaxWidth } from '../../shared/ts/enums';

import './PlayMenu.scss';
import logo from '../../assets/svg/logo.svg';
import { GameMenuShowIconSvg } from '../../components/gameMenuShowIconSvg/GameMenuShowIconSvg';
import { GameMenuIconSvg } from '../../components/gameMenuIconSvg/GameMenuIconSvg';

export const PlayMenu: React.FC = () => {
  const [menuIsVisible, setMenuIsVisible] = useState<boolean>(true);

  useEffect(() => {
    if (isScreen(ScreenMaxWidth.SMALL)) {
      setMenuIsVisible(false);
    }
  }, []);

  return (
    <div className="play-menu-wrapper">
      <section className={`play-menu ${menuIsVisible && 'is-visible'}`}>
        <h2 className="play-menu-heading">Navigate</h2>
        <nav className="play-menu-navigation">
          <img className="play-menu-logo" src={logo} />
          <div className="play-menu-link-container">
            <button className="play-menu-button" onClick={() => console.log(';)')}>
              <GameMenuIconSvg iconName="territory" className="play-menu-icon" />
              My territory
            </button>
            <Link className="play-menu-link" to="/players">
              <GameMenuIconSvg iconName="players" className="play-menu-icon" />
              Players
            </Link>
            <Link className="play-menu-link" to="/redeem">
              <GameMenuIconSvg iconName="redeem" className="play-menu-icon" />
              Redeem
            </Link>
            <Link className="play-menu-link" to="/wallet">
              <GameMenuIconSvg iconName="wallet" className="play-menu-icon" />
              Wallet
            </Link>
          </div>
          <div className="play-menu-link-container">
            <Link className="play-menu-link" to="/faq">
              <GameMenuIconSvg iconName="faq" className="play-menu-icon" />
              FAQ
            </Link>
            <Link className="play-menu-link" to="/settings">
              <GameMenuIconSvg iconName="settings" className="play-menu-icon" />
              Settings
            </Link>
          </div>
        </nav>
        <img src={logo} className="play-menu-logo-small" />
      </section>
      <button
        className={`play-menu-button show-menu-button ${menuIsVisible && 'is-active'}`}
        onClick={() => setMenuIsVisible(!menuIsVisible)}
      >
        <GameMenuShowIconSvg className="show-menu-button-icon" color={menuIsVisible ? 'white' : 'purple'} />
      </button>
    </div>
  );
};
