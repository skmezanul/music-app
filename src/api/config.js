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
  spotify: 'https://api.spotify.com/v1/',
  spotifyBackend: '',
  backend: 'http://api.micro100.de:3000/music-app/v1/',
  youtube: 'https://www.googleapis.com/youtube/v3/',
};
