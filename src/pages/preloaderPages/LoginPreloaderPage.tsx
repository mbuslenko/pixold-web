import { useState } from 'react';
import axios from 'axios';

import './LoginPreloaderPage.scss';
import loaderLogo from '../../assets/svg/loader-logo.svg';
import { IAuthResponse } from './interfaces';
import { GoogleLoginResponse } from 'react-google-login';
import { Navigate } from 'react-router-dom';

// TODO: baseUrl should be global variable
const baseUrl = 'https://pixold.azurewebsites.net';

const LoginPreloaderPage: React.FC = () => {
  const [redirectToPlay, setRedirectToPlay] = useState<boolean>(false);
  /*  const [isLoading, setIsLoading] = useState<boolean>(false); */

  const responseGoogleData: GoogleLoginResponse = JSON.parse(
    window.localStorage.getItem('responseGoogleData') as string,
  );

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

  return (
    <>
      <div className="loader-wrap">
        <img src={loaderLogo} alt="loader Logo" className="loader-logo" />
        <div className="loader-text">Loading...</div>
        {redirectToPlay && <Navigate to="/play" />}
      </div>
    </>
  );
};

export default LoginPreloaderPage;
