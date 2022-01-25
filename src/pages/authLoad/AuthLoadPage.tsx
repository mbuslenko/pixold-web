import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { PostResponseAuth } from '../../shared/ts/types';
import { getAxiosInstance } from '../../shared/ts/axiosInstance';
import { IPostDataAuth } from '../../shared/ts/interfaces';

import './AuthLoadPage.scss';
import loaderLogo from '../../assets/svg/loader-logo.svg';

export const AuthLoadPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const responseData: IPostDataAuth = JSON.parse(window.localStorage.getItem('responseData') as string);

    if (!responseData) {
      navigate('/auth');
    }

    const responseCallback = (response: PostResponseAuth) => {
      window.localStorage.setItem('userId', response.data.userId);
      window.localStorage.setItem('accessToken', response.data.accessToken);
      window.localStorage.setItem('username', response.data.username);

      if (response.data.updateUsername === true) {
        return navigate('/username');
      } else {
        return navigate('/play');
      }
    };

    getAxiosInstance(navigate)({
      requestConfig: {
        method: 'post',
        url: '/auth',
        data: responseData,
      },
      onResponse: responseCallback,
    });
  }, [navigate]);

  return (
    <article className="loader-wrap">
      <img src={loaderLogo} alt="loader Logo" className="loader-logo" />
      <div className="loader-text">Loading...</div>
    </article>
  );
};
