import { MouseEventHandler, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import GoogleLogin, { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';

import axios from 'axios';

import './LoginPage.scss';
import { IAuthResponse } from './interfaces';

// TODO: baseUrl should be global variable
const baseUrl = 'https://pixold.azurewebsites.net';

// TODO: add clientId into environment file
const clientId = '574224742867-trmdu15b20r5ejv3i42eek47l2m9q8dv.apps.googleusercontent.com';

const LoginPage: React.FC = () => {
  const [redirectToPlay, setRedirectToPlay] = useState<boolean>(false);

  useEffect(() => {
    if (window.localStorage.getItem('id') && window.localStorage.getItem('accessToken')) {
      setRedirectToPlay(true);
    }
  }, []);

  const handleLoginSuccess = async (responseGoogleData: GoogleLoginResponse | GoogleLoginResponseOffline) => {

    if (!('tokenId' in responseGoogleData)) {
      return;
    }

    axios
      .post<IAuthResponse>(`${baseUrl}/auth`, {
        email: responseGoogleData.profileObj.email,
        firstName: responseGoogleData.profileObj.givenName,
        lastName: responseGoogleData.profileObj.familyName,
        avatarUrl: responseGoogleData.profileObj.imageUrl,
      })
      .then((res) => {
        window.localStorage.setItem('id', res.data.id);
        window.localStorage.setItem('accessToken', res.data.accessToken);
        setRedirectToPlay(true);
      })
      .catch((er) => console.error(er));
  };

  const handleLoginFailure = (e: any) => {
    console.log(e);
  };

  return (
    <div className="login-wrap">
      <div className="login-content">
        <div className="logo"></div>
        <div className="login-title">Authenticate</div>
        <div className="login-desc">You need to be authorized to play the game</div>
        <div className="login-btn-wrap">
          <button className="login-btn login-apple-btn">Continue with Apple</button>
          <GoogleLogin
            clientId={clientId}
            render={(renderProps: { onClick: MouseEventHandler<HTMLButtonElement> | undefined; disabled: boolean | undefined; }) => (
              <button
                className="login-btn login-google-btn"
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
              >
                Continue with Google
              </button>
            )}
            buttonText="Login"
            onSuccess={handleLoginSuccess}
            onFailure={(e: any) => handleLoginFailure(e)}
            cookiePolicy={'single_host_origin'}
          />
        </div>
      </div>
      {redirectToPlay && <Navigate to="/play" />}
    </div>
  );
};

export default LoginPage;
