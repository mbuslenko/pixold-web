import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

//eslint-disable-next-line
//@ts-ignore
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
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
    <section className="login-wrap">
      <main className="login-content">
        <div className="logo" />
        <div className="login-title">Authenticate</div>
        <div className="login-desc">You need to be authorized to play the play</div>
        <div className="login-btn-wrap">
          <FacebookLogin 
            appId="441891864096517"
            autoLoad={false}
            fields="name,email,picture"
            callback={(response: any) => {
              console.log(response);
            }}
            render={(renderProps: any) => (
              <Button text="Continue with Apple" appearance={{ priority: 'primary', theme: 'apple' }} onClick={renderProps.onClick} />
            )}
          />    
          <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID ?? ''}
            render={(renderProps) => (
              <Button
                text="Continue with Google"
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
      </main>
    </section>
  );
};
