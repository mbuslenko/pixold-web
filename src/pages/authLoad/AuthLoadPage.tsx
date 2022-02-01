import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { PostResponseAuth } from '../../shared/ts/types';
import { IPostDataAuth } from '../../shared/ts/interfaces';

import { Loader } from '../../components/loader/Loader';

import './AuthLoadPage.scss';
import { client } from '../../shared/ts/ClientCommunication';

export const AuthLoadPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const responseData: IPostDataAuth = JSON.parse(localStorage.getItem('responseData') as string);

    if (!responseData) {
      navigate('/auth', { replace: true });
    }

    const responseCallback = (response: PostResponseAuth) => {
      const { userId, accessToken, username, wallet, updateUsername } = response.data;

      localStorage.setItem('userId', userId);
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('username', username);
      if (wallet) {
        localStorage.setItem('wallet', JSON.stringify(wallet));
      }

      client.connectSocket();

      if (updateUsername) {
        navigate('/username', { replace: true });

        return;
      }

      navigate('/play', { replace: true });
    };

    client.prepareRequest(navigate)({
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
