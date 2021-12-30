import { AxiosResponse } from 'axios';

import { useNavigate } from 'react-router-dom';
import { GoogleLoginResponse } from 'react-google-login';

import { AxiosInstance } from '../../components/AxiosInstance';

import './LoginPreloaderPage.scss';
import loaderLogo from '../../assets/svg/loader-logo.svg';

export const LoginPreloaderPage: React.FC = () => {
  const navigate = useNavigate();
  const responseGoogleData: GoogleLoginResponse = JSON.parse(
    window.localStorage.getItem('responseGoogleData') as string,
  );

  if (!responseGoogleData) {
    navigate('/auth');
  }

  const responseData = {
    email: responseGoogleData.profileObj.email,
    firstName: responseGoogleData.profileObj.givenName,
    lastName: responseGoogleData.profileObj.familyName,
    avatarUrl: responseGoogleData.profileObj.imageUrl,
  };

  const responseCallback = (response: AxiosResponse) => {
    window.localStorage.setItem('userId', response.data.userId);
    window.localStorage.setItem('accessToken', response.data.accessToken);
    
    if (response.data.updateUsername === true) {
      return navigate('/username');
    } else {
      return navigate('/play');
    }
  };

  return (
    <>
      <div className="loader-wrap">
        <img src={loaderLogo} alt="loader Logo" className="loader-logo" />
        <div className="loader-text">Loading...</div>
        <AxiosInstance
          requestMethod='post'
          requestUrl='/auth'
          requestData={responseData}
          responseCallback={responseCallback}
          errorCallback={error => console.error(error)}
        />
      </div>
    </>
  );
};
