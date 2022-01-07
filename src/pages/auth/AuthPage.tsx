import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// FIXME: solve type issue
// eslint-disable-next-line
// @ts-ignore
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import GoogleLogin from 'react-google-login';

import { GetResponseLoginFacebook, GetResponseLoginGoogle } from '../../shared/ts/types';
import { IPostDataAuth } from '../../shared/ts/interfaces';

import { Button } from '../../components/button/Button';

import './AuthPage.scss';

export const AuthPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (window.localStorage.getItem('userId') && window.localStorage.getItem('accessToken')) {
      navigate('/play');
    }
  }, []);

  const handleGoogleAuthSuccess = async (responseGoogleData: GetResponseLoginGoogle) => {
    if (!('tokenId' in responseGoogleData)) {
      return;
    }

    const responseData: IPostDataAuth = {
      email: responseGoogleData.profileObj.email,
      firstName: responseGoogleData.profileObj.givenName,
      lastName: responseGoogleData.profileObj.familyName,
      avatarUrl: responseGoogleData.profileObj.imageUrl,
    };

    window.localStorage.setItem('responseData', JSON.stringify(responseData));

    navigate('/auth/load');
  };

  const handleFacebookAuthSuccess = async (facebookResponseData: GetResponseLoginFacebook) => {
    const fullName = facebookResponseData.name.split(' ');
    const responseData: IPostDataAuth = {
      email: facebookResponseData.email,
      avatarUrl: facebookResponseData.picture.data.url,
      firstName: fullName[0],
      lastName: fullName[1],
    };

    window.localStorage.setItem('responseData', JSON.stringify(responseData));

    navigate('/auth/load');
  };

  return (
    <section className="login-wrap">
      <main className="login-content">
        <div className="logo" />
        <div className="login-title">Authenticate</div>
        <div className="login-desc">You need to be authorized to play the play</div>
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
            appId={process.env.REACT_APP_FACEBOOK_CLIENT_ID}
            autoLoad={false}
            fields="name,email,picture"
            callback={handleFacebookAuthSuccess}
            // FIXME: change any to specific type
            render={(renderProps: any) => (
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
