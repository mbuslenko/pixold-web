import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

//eslint-disable-next-line
//@ts-ignore
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import GoogleLogin from 'react-google-login';

import { GetResponseLoginFacebook, GetResponseLoginGoogle } from '../../shared/ts/types';

import { useAppDispatch, useAppSelector } from '../../store/store';

import { Button } from '../../components/button/Button';

import './AuthPage.scss';
import { IFacebookLoginRenderProps } from './interfaces';
import { setPostDataAuth } from '../../store/userSlice';

export const AuthPage: React.FC = () => {
  const dispatch = useAppDispatch();

  const accessToken = useAppSelector((state) => state.user.accessToken);

  const navigate = useNavigate();

  const handleGoogleAuthSuccess = async (responseGoogle: GetResponseLoginGoogle) => {
    if (!('accessToken' in responseGoogle)) {
      return;
    }

    dispatch(
      setPostDataAuth({
        email: responseGoogle.profileObj.email,
        firstName: responseGoogle.profileObj.givenName,
        lastName: responseGoogle.profileObj.familyName,
        avatarUrl: responseGoogle.profileObj.imageUrl,
      }),
    );

    navigate('/auth/load', { replace: true });
  };

  const handleFacebookAuthSuccess = async (responseFacebook: GetResponseLoginFacebook) => {
    if (!('accessToken' in responseFacebook)) {
      return;
    }

    const fullName = responseFacebook.name.split(' ');

    dispatch(
      setPostDataAuth({
        email: responseFacebook.email,
        avatarUrl: responseFacebook.picture.data.url,
        firstName: fullName[0],
        lastName: fullName[1],
      }),
    );

    navigate('/auth/load', { replace: true });
  };

  useEffect(() => {
    if (accessToken) {
      navigate('/play', { replace: true });
    }
  }, [accessToken, navigate]);

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
