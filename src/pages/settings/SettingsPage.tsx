import { Link } from 'react-router-dom';

import { Button } from '../../components/button/Button';

import './SettingsPage.scss';
import logo from '../../assets/svg/logo.svg';
import userPhoto from '../../assets/img/user-photo.png';

export const SettingsPage: React.FC = () => {
  return (
    <section className="settings-page">
      <header className="settings-header">
        <Link to="/play">
          <Button
            text="← Back to game"
            appearance={{ priority: 'secondary', theme: 'black-white' }}
            className="settings-btn-back-game"
          />
        </Link>
        <Link to="/play">
          <Button
            text="← "
            appearance={{ priority: 'secondary', theme: 'black-white' }}
            className="settings-btn-back-game-mobile"
          />
        </Link>
        <img src={logo} alt="Logo" className="settings-logo" />
      </header>

      <main className="settings-content">
        <div>
          <img src={userPhoto} alt="User Photo" className="settings-user-photo" />
          <h2 className="settings-title-surname">Name Surname</h2>
          <p className="settings-surname">slavik_228</p>
          <Button
            text="Change username"
            appearance={{ priority: 'secondary', theme: 'black-white' }}
            className="settings-btn"
          />
        </div>
        <div className="settings-wallet-wrap">
          <h3 className="settings-title-wallet">Wallet</h3>
          <p className="settings-wallet">GCR2BLWVAEP3LDDQBYVM7PK25MPP5JAEOFN2TMIUOAKF33A7G2TD6ZZV</p>
          <Button
            text="Change wallet"
            appearance={{ priority: 'secondary', theme: 'black-white' }}
            className="settings-btn"
          />
        </div>
        <Button
          text="Log out"
          appearance={{ priority: 'primary', theme: 'black-white' }}
          className="settings-btn-logout"
        />
      </main>
    </section>
  );
};
