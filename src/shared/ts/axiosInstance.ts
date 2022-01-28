import axios from 'axios';

import { NavigateFunction } from 'react-router-dom';

import { AxiosInstanceFunction } from './types';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

export const getAxiosInstance = (navigate: NavigateFunction): AxiosInstanceFunction => {
  return ({ requestConfig, onResponse, onError }) => {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken) {
      axiosInstance.defaults.headers.common.Authorization = accessToken;
    }

    axiosInstance
      .request(requestConfig)
      .then(onResponse)
      .catch((error) => {
        const { status } = error.response;

        if (status === 403 || status === 401) {
          localStorage.clear();
          navigate('/auth', { replace: true });

          return;
        } else if (status === 500) {
          navigate('/500');

          return;
        }

        if (onError) {
          onError(error);
        }
      });
  };
};
