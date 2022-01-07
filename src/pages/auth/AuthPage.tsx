import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

//eslint-disable-next-line
//@ts-ignore
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import GoogleLogin, { GoogleLoginResponse } from 'react-google-login';

import { GetResponseLoginGoogle } from '../../shared/ts/types';
import { FacebookResponseData, IResponseData } from '../../components/interfaces';

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
    responseGoogleData = responseGoogleData as unknown as GoogleLoginResponse; // :0

    const responseData: IResponseData = {
      email: responseGoogleData.profileObj.email,
      firstName: responseGoogleData.profileObj.givenName,
      lastName: responseGoogleData.profileObj.familyName,
      avatarUrl: responseGoogleData.profileObj.imageUrl,
    };

    window.localStorage.setItem('responseData', JSON.stringify(responseData));

    navigate('/auth/load');
  };

  const handleFacebookAuthSuccess = async (facebookResponseData: FacebookResponseData.Response) => {
    const firstName = facebookResponseData.name.split(' ')[0];
    const lastName = facebookResponseData.name.split(' ')[1];

    const responseData: IResponseData = {
      email: facebookResponseData.email,
      avatarUrl: facebookResponseData.picture.data.url,
      firstName,
      lastName,
    };

    window.localStorage.setItem('responseData', JSON.stringify(responseData));

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
            appId={process.env.REACT_APP_FACEBOOK_CLIENT_ID}
            autoLoad={false}
            fields="name,email,picture"
            callback={handleFacebookAuthSuccess}
            render={(renderProps: any) => (
              <Button
                text="Continue with Facebook"
                appearance={{ priority: 'primary', theme: 'apple' }}
                onClick={renderProps.onClick}
              />
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
            onSuccess={handleGoogleAuthSuccess}
            onFailure={handleLoginFailure}
            cookiePolicy={'single_host_origin'}
          />
        </div>
      </main>
    </section>
  );
};
