/* eslint-disable one-var, max-len */
import store from '@/store';

const { getters } = store;

export const credentials = {
  // spotify api credentials
  accessToken: getters['auth/getAccessToken'],
  refreshToken: getters['auth/getRefreshToken'],
  expiryTime: getters['auth/getExpiryTime'],

  // spotify backend api token
  spotifyBackendToken: '',

  // youtube api key
  youtubeApiKey: 'AIzaSyDV-D04s-RbQDwPXxadnt2LKpuC1rPveUc',
};

export const firebaseConfig = {
  apiKey: 'AIzaSyApFYAyjfvuYeCqH2os5i7A0ER9Nr6hkqw',
  authDomain: 'music-app-e05c2.firebaseapp.com',
  databaseURL: 'https://music-app-e05c2.firebaseio.com/',
};

export const baseURL = {
  spotify: 'https://api.spotify.com/v1/',
  spotifyBackend: 'https://spclient.wg.spotify.com/open-backend-2/v1/',
  backend: 'http://api.micro100.de:3000/music-app/v1/',
  youtube: 'https://www.googleapis.com/youtube/v3/',
};
