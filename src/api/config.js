/* eslint-disable one-var, max-len */
import store from '@/store';

const { getters } = store;

export const credentials = {
  // spotify api credentials
  accessToken: getters.getAccessToken,
  refreshToken: getters.getRefreshToken,
  expiryTime: getters.getExpiryTime,

  // spotify backend api token
  spotifyBackendToken: '',

  // youtube api key
  youtubeApiKey: '',
};

export const firebaseConfig = {
  apiKey: '',
  authDomain: '',
  databaseURL: '',
};

export const baseURL = {
  spotify: '',
  spotifyBackend: '',
  backend: '',
  youtube: '',
};
