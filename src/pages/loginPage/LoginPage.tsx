import { useEffect } from 'react';
import GoogleLogin, { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import { useNavigate } from 'react-router-dom';

import './LoginPage.scss';

// TODO: add clientId into environment file
const clientId = '574224742867-er1e971hndcooedtb4q6qi3mqioe5qh9.apps.googleusercontent.com';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (window.localStorage.getItem('userId') && window.localStorage.getItem('accessToken')) {
      navigate('/play');
    }
  }, []);

  const handleLoginSuccess = async (responseGoogleData: GoogleLoginResponse | GoogleLoginResponseOffline) => {
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
    </div>
  );
};
