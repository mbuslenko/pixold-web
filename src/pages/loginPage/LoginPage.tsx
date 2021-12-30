import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GoogleLogin from 'react-google-login';

import { GetResponseLoginGoogle } from '../../shared/ts/types';

import './LoginPage.scss';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (window.localStorage.getItem('userId') && window.localStorage.getItem('accessToken')) {
      navigate('/play');
    }
  }, []);

  const handleLoginSuccess = async (responseGoogleData: GetResponseLoginGoogle) => {
    if (!('tokenId' in responseGoogleData)) {
      return;
    }

    // TODO: Change to redux
    window.localStorage.setItem('responseGoogleData', JSON.stringify(responseGoogleData));
    navigate('/auth/load');
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
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID ?? ''}
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
    </div>
  );
};
