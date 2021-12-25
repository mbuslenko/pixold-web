import { useEffect, useState } from 'react';
import GoogleLogin, { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import { Navigate } from 'react-router-dom';

import './LoginPage.scss';

// TODO: add clientId into environment file
const clientId = '574224742867-j214k7camduhed6qdlut6pv2agi2k62r.apps.googleusercontent.com';

const LoginPage: React.FC = () => {
  const [redirectToPlay, setRedirectToPlay] = useState<boolean>(false);
  const [redirectToLoad, setRedirectToLoad] = useState<boolean>(false);

  useEffect(() => {
    if (window.localStorage.getItem('id') && window.localStorage.getItem('accessToken')) {
      setRedirectToPlay(true);
    }
  }, []);

  const handleLoginSuccess = async (responseGoogleData: GoogleLoginResponse | GoogleLoginResponseOffline) => {
    if (!('tokenId' in responseGoogleData)) {
      return;
    }

    // TODO: Change to redux
    window.localStorage.setItem('responseGoogleData', JSON.stringify(responseGoogleData));
    setRedirectToLoad(true);
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
            render={(renderProps) => (
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
            onFailure={handleLoginFailure}
            cookiePolicy={'single_host_origin'}
          />
        </div>
      </div>
      {redirectToPlay && <Navigate to="/play" />}
      {redirectToLoad && <Navigate to="/auth/load" />}
    </div>
  );
};

export default LoginPage;
