import axios from 'axios';

import { NavigateFunction } from 'react-router-dom';

import { AxiosInstanceFunction } from './types';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

// TODO: make { requestMethod, requestUrl, requestData, requestParams, } separate object
export const useAxiosInstance = (navigate: NavigateFunction): AxiosInstanceFunction => {
  return ({
    requestMethod,
    requestUrl,
    requestData,
    requestParams,
    onResponse,
    onError,
  }) => {
    const accessToken = window.localStorage.getItem('accessToken');

    if (accessToken) {
      axiosInstance.defaults.headers.common.Authorization = accessToken;
    }

    axiosInstance.request({
      method: requestMethod,
      url: requestUrl,
      data: requestData,
      params: requestParams,
    })
      .then(onResponse)
      .catch(error => {
        if (error.response.status === 403 || error.response.status === 401) {
          navigate('/auth');

          return;
        } else if (error.response.status === 500) {
          navigate('/500');

          return;
        }

        if (onError) {
          onError(error);
        }
      });
  };
};
