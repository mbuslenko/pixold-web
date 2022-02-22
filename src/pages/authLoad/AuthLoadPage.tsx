import { useNavigate } from 'react-router-dom';

import { PostResponseAuth } from '../../shared/ts/types';
import { connectSocket, prepareRequest } from '../../shared/ts/clientCommunication';

import { useAppDispatch, useAppSelector } from '../../store/store';

import { Loader } from '../../components/loader/Loader';

import './AuthLoadPage.scss';
import { setUserInfo } from '../../store/userSlice';
import { useEffect } from 'react';

export const AuthLoadPage: React.FC = () => {
  const dispatch = useAppDispatch();

  const postDataAuth = useAppSelector((state) => state.user.postDataAuth);

  const navigate = useNavigate();

  useEffect(() => {
    const responseCallback = (response: PostResponseAuth) => {
      console.log('auth response');
      const { accessToken, updateUsername } = response.data;

      dispatch(setUserInfo(response.data));

      connectSocket(dispatch, accessToken);

      if (updateUsername) {
        navigate('/username', { replace: true });

        return;
      }

      navigate('/play', { replace: true });
    };

    console.log(['post data', postDataAuth]);

    if (!postDataAuth) {
      console.log('no post data');
      return;
    }

    prepareRequest(
      navigate,
      dispatch,
    )({
      requestConfig: {
        method: 'post',
        url: '/auth',
        data: postDataAuth,
      },
      onResponse: responseCallback,
    });
  }, [dispatch, navigate, postDataAuth]);

  return (
    <section className="auth-load-page">
      <Loader />
    </section>
  );
};
