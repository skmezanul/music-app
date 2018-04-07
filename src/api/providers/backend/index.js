/* eslint-disable one-var */
import axios from 'axios';
import store from '@/store';

const refreshToken = store ? store.getters['auth/getRefreshToken'] : '';

// register music-app backend axios instance
const backend = axios.create({
  baseURL: 'http://api.micro100.de:3000/music-app/v1/',
});

export default backend;

// get url to authenticate the user
export const getAuthURL = (protocol, host) => backend({
  method: 'get',
  url: '/getAuthURL',
  params: {
    redirectURI: `${protocol}//${host}/login`,
  },
});

// get access token
export const getAccessToken = code => backend({
  method: 'get',
  url: '/getToken',
  params: {
    code,
  },
});

// refresh access token
export const refreshAccessToken = () => backend({
  method: 'get',
  url: '/refreshToken',
  params: {
    token: refreshToken,
  },
});
