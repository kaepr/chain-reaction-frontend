import axios from 'axios';
import {
  getAccessToken,
  getRefreshToken,
  setAccessToken,
  setRefreshToken,
} from '../tokenHandler';

let url = 'http://localhost:5000';
if (process.env.NODE_ENV === 'production') {
  url = 'https://chain-reaction-backend.herokuapp.com';
}

const API = axios.create({
  baseURL: url,
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
});

API.interceptors.request.use(
  function (config) {
    const token = getAccessToken();

    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

API.interceptors.response.use(
  function (response) {
    // is successful, return the same
    // console.log('another response = ', response);
    return response;
  },
  async function (error) {
    // if error, try agian
    const originalRequest = error.config;

    if (
      error.response.status === 401 &&
      originalRequest.url === '/api/auth/refresh-token'
    ) {
      return Promise.reject(error);
    }

    if (error.response.status === 401 && !originalRequest._retry) {
      try {
        originalRequest._retry = true;
        const refreshToken = getRefreshToken();
        const data = {
          refreshToken: refreshToken,
        };

        const res = await API.post('/api/auth/refresh-token', data);
        if (res.status === 200) {
          setAccessToken(res.data.accessToken);
          setRefreshToken(res.data.refreshToken);
          const token = getAccessToken();

          API.defaults.headers.common['Authorization'] = 'Bearer ' + token;
          return API.request(originalRequest);
        }
      } catch (err) {
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

export default API;
