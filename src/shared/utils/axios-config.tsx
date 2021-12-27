import axios from 'axios';

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { IAxiosInstanceProps } from './interfaces';

const axiosInstance = axios.create({
  baseURL: 'https://pixold.azurewebsites.net',
});

// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     console.log('error inside axios');

//     if (error.response.status === 401) {
//       // navigate('/auth');
//       setRedirectUrl('/auth');
//     } else if (error.response.status === 500) {
//       // navigate('/500');
//       setRedirectUrl('/navigate');
//     }

//     setRedirect(true);
//   },
// );

export const AxiosInstance: React.FC<IAxiosInstanceProps> = ({ postUrl, postData, responseCallback, errorCallback }) => {
  const navigate = useNavigate();
  const accessToken = window.localStorage.getItem('accessToken');

  if (accessToken) {
    axiosInstance.defaults.headers.common.Authorization = accessToken;
  }

  useEffect(
    () => {
      axiosInstance
        .post(postUrl, postData)
        .then(responseCallback)
        .catch(error => {
          console.log(['axios error', error]);

          if (error.response.status === 401) {
            navigate('/auth');
          } else if (error.response.status === 500) {
            navigate('/500');
          }

          errorCallback(error);
        });
    },
    []
  );

  return (<></>);
};
