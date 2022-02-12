import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { PostResponseAuth } from '../../shared/ts/types';
import { IPostDataAuth } from '../../shared/ts/interfaces';

import { Loader } from '../../components/loader/Loader';

import './AuthLoadPage.scss';
import { connectSocket, prepareRequest } from '../../shared/ts/clientCommunication';
import { useDispatch } from 'react-redux';
import { checkAuth } from '../../shared/ts/helperFunctions';

export const AuthLoadPage: React.FC = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    const responseData: IPostDataAuth = JSON.parse(localStorage.getItem('responseData') as string);

    checkAuth(navigate);

    const responseCallback = (response: PostResponseAuth) => {
      const { userId, accessToken, username, wallet, updateUsername } = response.data;

      localStorage.setItem('userId', userId);
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('username', username);
      if (wallet) {
        localStorage.setItem('wallet', JSON.stringify(wallet));
      }

      connectSocket(dispatch);

      if (updateUsername) {
        navigate('/username', { replace: true });

        return;
      }

      navigate('/play', { replace: true });
    };

    prepareRequest(
      navigate,
      dispatch,
    )({
      requestConfig: {
        method: 'post',
        url: '/auth',
        data: responseData,
      },
      onResponse: responseCallback,
    });
  }, [dispatch, navigate]);

  return (
    <section className="auth-load-page">
      <Loader />
    </section>
  );
};
