import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { PostResponseAuth } from '../../shared/ts/types';
import { getAxiosInstance } from '../../shared/ts/axiosInstance';
import { IPostDataAuth } from '../../shared/ts/interfaces';

import { Loader } from '../../components/loader/Loader';

import './AuthLoadPage.scss';

export const AuthLoadPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const responseData: IPostDataAuth = JSON.parse(window.localStorage.getItem('responseData') as string);

    if (!responseData) {
      navigate('/auth', { replace: true });
    }

    const responseCallback = (response: PostResponseAuth) => {
      window.localStorage.setItem('userId', response.data.userId);
      window.localStorage.setItem('accessToken', response.data.accessToken);
      window.localStorage.setItem('username', response.data.username);

      if (response.data.updateUsername === true) {
        return navigate('/username', { replace: true });
      } else {
        return navigate('/play', { replace: true });
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
    <section className="auth-load-page">
      <Loader />
    </section>
  );
};
