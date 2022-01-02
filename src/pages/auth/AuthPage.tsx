import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GoogleLogin from 'react-google-login';

import { GetResponseLoginGoogle } from '../../shared/ts/types';

import { Button } from '../../components/button/Button';

import './AuthPage.scss';

export const AuthPage: React.FC = () => {
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
          <Button
            text='Continue with Apple'
            appearance={{ priority: 'primary', theme: 'apple' }}
          />
          <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID ?? ''}
            render={(renderProps) => (
              <Button
                text='Continue with Google'
                appearance={{ priority: 'primary', theme: 'google' }}
                {...renderProps}
              />
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
