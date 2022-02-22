import axios from 'axios';
import { io } from 'socket.io-client';

import { Dispatch } from '@reduxjs/toolkit';
import { NavigateFunction } from 'react-router-dom';

import { addInfoAlert, clearAlertAll } from '../../store/alertSlice';
import { setIsSocketConnected } from '../../store/socketSlice';
import { IAxiosInstanceProps } from './interfaces';
import { AxiosInstanceFunction, SocketEventListener, SocketEventType } from './types';
import { clearUserInfo } from '../../store/userSlice';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

let socket: ReturnType<typeof io> | null = null;

export const onSocketEvent = (eventListener: SocketEventListener): void => {
  socket?.on(eventListener.event, eventListener.callback);
};

export const removeSocketEventListenerAll = (event: SocketEventType): void => {
  socket?.removeAllListeners(event);
};

export const connectSocket = (dispatch: Dispatch, accessToken: string): void => {
  if (socket) {
    return;
  }

  if (accessToken) {
    socket = io(process.env.REACT_APP_BASE_URL as string);

    socket.on('connect', () => {
      dispatch(setIsSocketConnected(true));

      onSocketEvent({
        event: 'info',
        callback: ({ title, body }) => dispatch(addInfoAlert({ heading: title, text: body })),
      });
    });
  }
};

export const disconnectSocket = (dispatch: Dispatch): void => {
  if (!socket) {
    return;
  }

  socket.on('disconnect', () => {
    dispatch(setIsSocketConnected(false));
    socket = null;
  });

  socket.disconnect();
};

export const prepareRequest = (navigate: NavigateFunction, dispatch: Dispatch): AxiosInstanceFunction => {
  return (payload: IAxiosInstanceProps) => {
    const { requestConfig, onResponse, onError } = payload;
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken) {
      axiosInstance.defaults.headers.common.Authorization = accessToken;
    }

    axiosInstance
      .request(requestConfig)
      .then((response) => {
        if (onResponse) {
          onResponse(response);
        }
      })
      .catch((error) => {
        // TODO: uncomment for production
        // if (!error.response) {
        //   this._axios.get(
        //     `https://api.telegram.org/bot5014031741:AAFC3FFScFltAqKPeJ0QnWxYNFKHRDH4Y-E/sendMessage?chat_id=-709885501&text=@mbuslenko SERVER ERROR RESPONSE IS UNDEFINED`,
        //   );
        //   navigate('/500');

        //   return;
        // }

        const { status } = error.response;

        if (status === 403 || status === 401) {
          dispatch(clearUserInfo());
          dispatch(clearAlertAll());
          disconnectSocket(dispatch);

          navigate('/auth', { replace: true });

          return;
        }

        if (status === 500) {
          navigate('/500');

          return;
        }

        if (onError) {
          onError(error);
        }
      });
  };
};
