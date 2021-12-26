import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://pixold.azurewebsites.net',
});

const userId = window.localStorage.getItem('userId');
const accessToken = window.localStorage.getItem('accessToken');

if (userId) {
  axiosInstance.defaults.headers.common['User'] = userId;
}
if (accessToken) {
  axiosInstance.defaults.headers.common['Authorization'] = accessToken;
}

axiosInstance.interceptors.response.use(
  // on success
  (response) => response,
  // on error
  (error) => {
    if (error.response.status === 401) {
      throw new Error('Unauthorized'); // TODO: redirect to login page
    } else if (error.response.status === 500) {
      throw new Error('Internal server error occurred'); // TODO: redirect to 500 page
    }
  },
);

export default axiosInstance;
