import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { PostResponseAuth } from '../../shared/ts/types';
import { useAxiosInstance } from '../../shared/ts/axiosInstance';
import { IPostDataAuth } from '../../shared/ts/interfaces';

import './AuthLoadPage.scss';
import loaderLogo from '../../assets/svg/loader-logo.svg';

export const AuthLoadPage: React.FC = () => {
  const navigate = useNavigate();
  const request = useAxiosInstance(navigate);
  const responseData: IPostDataAuth = JSON.parse(window.localStorage.getItem('responseData') as string);

  if (!responseData) {
    navigate('/auth');
  }

  const responseCallback = (response: PostResponseAuth) => {
    window.localStorage.setItem('userId', response.data.userId);
    window.localStorage.setItem('accessToken', response.data.accessToken);

    if (response.data.updateUsername === true) {
      return navigate('/username');
    } else {
      return navigate('/play');
    }
  };

  useEffect(() => {
    request({
      requestConfig: {
        method: 'post',
        url: '/auth',
        data: responseData,
      },
      onResponse: responseCallback,
    });
  }, []);

  return (
    <article className="loader-wrap">
      <img src={loaderLogo} alt="loader Logo" className="loader-logo" />
      <div className="loader-text">Loading...</div>
    </article>
  );
};
