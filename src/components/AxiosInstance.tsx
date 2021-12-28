import axios from 'axios';

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { IAxiosInstanceProps } from './interfaces';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

export const AxiosInstance: React.FC<IAxiosInstanceProps> = ({
  requestMethod,
  requestUrl,
  requestData,
  responseCallback,
  errorCallback,
}) => {
  const navigate = useNavigate();
  const accessToken = window.localStorage.getItem('accessToken');

  if (accessToken) {
    axiosInstance.defaults.headers.common.Authorization = accessToken;
  }

  useEffect(
    () => {
      axiosInstance[requestMethod](requestUrl, requestData)
        .then(responseCallback)
        .catch(error => {
          if (error.response.status === 403 || error.response.status === 401) {
            navigate('/auth');
          } else if (error.response.status === 500) {
            navigate('/500');
          }

          errorCallback(error);
        });
    },
    [],
  );

  return (<></>);
};