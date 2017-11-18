import store from '@/store';

// vuex credentials getter
const credentialsGetter = store.getters.getCredentials;

export const credentials = {
  // spotify api credentials
  accessToken: credentialsGetter.accessToken,
  refreshToken: credentialsGetter.refreshToken,
  expiryTime: credentialsGetter.expiryTime,

  // spotify backend api token
  spotifyBackendToken: '',

  // youtube api key
  youtubeApiKey: '',
};

export const baseURL = {
  spotify: 'https://api.spotify.com/v1/',
  spotifyBackend: 'https://spclient.wg.spotify.com/open-backend-2/v1/',
  backend: 'http://82.165.99.125:3000/music-app/v1/',
  youtube: 'https://www.googleapis.com/youtube/v3/',
};
