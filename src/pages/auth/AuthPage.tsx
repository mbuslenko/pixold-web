import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

//eslint-disable-next-line
//@ts-ignore
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import GoogleLogin from 'react-google-login';

import { GetResponseLoginFacebook, GetResponseLoginGoogle } from '../../shared/ts/types';
import { IPostDataAuth } from '../../shared/ts/interfaces';

import { Button } from '../../components/button/Button';

import './AuthPage.scss';
import { IFacebookLoginRenderProps } from './interfaces';

export const AuthPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    console.log(localStorage.getItem('accessToken'));

    if (localStorage.getItem('userId') && localStorage.getItem('accessToken')) {
      navigate('/play', { replace: true });
    }
  }, [navigate]);

  const handleGoogleAuthSuccess = async (responseGoogle: GetResponseLoginGoogle) => {
    if (!('accessToken' in responseGoogle)) {
      return;
    }

    const responseData: IPostDataAuth = {
      email: responseGoogle.profileObj.email,
      firstName: responseGoogle.profileObj.givenName,
      lastName: responseGoogle.profileObj.familyName,
      avatarUrl: responseGoogle.profileObj.imageUrl,
      accessToken: responseGoogle.accessToken,
      platform: 'google',
    };

    localStorage.setItem('responseData', JSON.stringify(responseData));

    navigate('/auth/load', { replace: true });
  };

  const handleFacebookAuthSuccess = async (responseFacebook: GetResponseLoginFacebook) => {
    if (!('accessToken' in responseFacebook)) {
      return;
    }

    const fullName = responseFacebook.name.split(' ');
    const responseData: IPostDataAuth = {
      email: responseFacebook.email,
      avatarUrl: responseFacebook.picture.data.url,
      firstName: fullName[0],
      lastName: fullName[1],
      accessToken: responseFacebook.accessToken,
      platform: 'facebook',
    };

    localStorage.setItem('responseData', JSON.stringify(responseData));

    navigate('/auth/load', { replace: true });
  };

  return (
    <section className="login-wrap">
      <main className="login-content">
        <div className="logo" />
        <div className="login-title">Authenticate</div>
        <div className="login-desc">You need to be authorized to play the game</div>
        <div className="login-btn-wrap">
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
            onSuccess={handleGoogleAuthSuccess}
            cookiePolicy={'single_host_origin'}
          />
          <FacebookLogin
            appId={process.env.REACT_APP_FACEBOOK_CLIENT_ID ?? ''}
            autoLoad={false}
            fields="name,email,picture"
            callback={handleFacebookAuthSuccess}
            render={(renderProps: IFacebookLoginRenderProps) => (
              <Button
                text="Continue with Facebook"
                appearance={{ priority: 'primary', theme: 'facebook' }}
                {...renderProps}
              />
            )}
          />
        </div>
      </main>
    </section>
  );
};
