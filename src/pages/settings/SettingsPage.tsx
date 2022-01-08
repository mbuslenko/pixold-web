import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useAxiosInstance } from '../../shared/ts/axiosInstance';
import { GetResponseUserData } from '../../shared/ts/types';

import { Button } from '../../components/button/Button';

import './SettingsPage.scss';
import logo from '../../assets/svg/logo.svg';

export const SettingsPage: React.FC = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [avatarUrl, setAvatarUrl] = useState<string>('');
  const [wallet, setWallet] = useState<string>('');

  const getUserResponseCallback = (response: GetResponseUserData): void => {
    const { avatarUrl, firstName, lastName, wallet } = response.data;

    setAvatarUrl(avatarUrl);
    setFirstName(firstName);
    lastName === null ? setLastName('') : setLastName(lastName);
    wallet === '0' || wallet === null ? setWallet('-') : setWallet(wallet);
  };

  useEffect(() => {
    useAxiosInstance(navigate)({
      requestConfig: {
        url: '/user/me',
        method: 'get',
      },
      onResponse: getUserResponseCallback,
    });
  }, []);

  const changeUsernameBtnCallback = () => {
    navigate('/username');
  };

  const changeWalletBtnCallback = () => {
    navigate('/wallet/connect');
  };

  const logOutBtnCallback = () => {
    window.localStorage.removeItem('accessToken');
    navigate('/auth');
  };

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
          <img src={avatarUrl} alt="User Photo" className="settings-user-photo" />
          <h2 className="settings-title-surname">Name Surname</h2>
          <p className="settings-surname">{`${firstName} ${lastName}`}</p>
          <Button
            text="Change username"
            appearance={{ priority: 'secondary', theme: 'black-white' }}
            className="settings-btn"
            onClick={changeUsernameBtnCallback}
          />
        </div>
        <div className="settings-wallet-wrap">
          <h3 className="settings-title-wallet">Wallet</h3>
          <p className="settings-wallet">{wallet}</p>
          <Button
            text="Change wallet"
            appearance={{ priority: 'secondary', theme: 'black-white' }}
            className="settings-btn"
            onClick={changeWalletBtnCallback}
          />
        </div>
        <Button
          text="Log out"
          appearance={{ priority: 'primary', theme: 'black-white' }}
          className="settings-btn-logout"
          onClick={logOutBtnCallback}
        />
      </main>
    </section>
  );
};
