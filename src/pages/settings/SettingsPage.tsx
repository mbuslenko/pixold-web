import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { GetResponseUserData } from '../../shared/ts/types';

import { Button } from '../../components/button/Button';

import './SettingsPage.scss';
import logo from '../../assets/svg/logo.svg';
import { client } from '../../shared/ts/ClientCommunication';
import { Loader } from '../../components/loader/Loader';

export const SettingsPage: React.FC = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [avatarUrl, setAvatarUrl] = useState<string>('');
  const [wallet, setWallet] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [isVisibleInfo, setIsVisibleInfo] = useState(false);

  if (!localStorage.getItem('accessToken')) {
    navigate('/auth', { replace: true });
  }

  const getUserResponseCallback = (response: GetResponseUserData): void => {
    const { username, avatarUrl, firstName, lastName, wallet } = response.data;

    setUsername(username);
    setAvatarUrl(avatarUrl);
    setFirstName(firstName);
    lastName === null ? setLastName('') : setLastName(lastName);
    wallet === '0' || wallet === null ? setWallet('-') : setWallet(wallet);

    setIsVisibleInfo(true);
  };

  useEffect(() => {
    client.prepareRequest(navigate)({
      requestConfig: {
        url: '/user/me',
        method: 'get',
      },
      onResponse: getUserResponseCallback,
    });
  }, [navigate]);

  const changeUsernameBtnCallback = () => {
    navigate('/username');
  };

  const changeWalletBtnCallback = () => {
    navigate('/wallet/connect');
  };

  const logOutBtnCallback = () => {
    localStorage.clear();
    client.disconnectSocket();
    navigate('/auth');
  };

  return (
    <section className="settings-page">
      <header className="settings-header">
        <Link to="/play">
          <Button
            text="← Back to play"
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

      {isVisibleInfo ? (
        <main className="settings-content">
          <div>
            <img src={avatarUrl} alt="User Avatar" className="settings-user-photo" />
            <h2 className="settings-title-surname">{`${firstName} ${lastName}`}</h2>
            <p className="settings-surname">{username}</p>
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
      ) : (
        <Loader />
      )}
    </section>
  );
};
