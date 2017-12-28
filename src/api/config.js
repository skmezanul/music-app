/* eslint-disable one-var, max-len */
import store from '@/store';

const { getters } = store;

export const credentials = {
  // spotify api credentials
  accessToken: getters.getAccessToken,
  refreshToken: getters.getRefreshToken,
  expiryTime: getters.getExpiryTime,

  // spotify backend api token
  spotifyBackendToken: 'BQDxUDT9WADQou2z7s_SJmloaFfQp3QF3lB7-quiVEXFkuyrVQ6zz26REGQmIR4BfeeT5WeniGRzU4DRUzq6w1VApA2gqjKP0AEH1pBwWGR7T1HbYjxjRXcHiiJIauC-Ok-vOEU6t1L5KDYiwK3GIOjc2g0vE6BjpUiTEUzszrF1Wsxx3TTydN34Wbiu56BQSHSSIOksSXIHco_KqUC2Qi3oUwBj82QknuM7TyNBFc9-p-F2E03sJjIhIpwRI0LVoXqROpQZ3bnNcLOR1Z0',

  // youtube api key
  youtubeApiKey: 'AIzaSyDV-D04s-RbQDwPXxadnt2LKpuC1rPveUc',
};

export const firebaseConfig = {
  apiKey: 'AIzaSyApFYAyjfvuYeCqH2os5i7A0ER9Nr6hkqw',
  authDomain: 'music-app-e05c2.firebaseapp.com',
  projectId: 'music-app-e05c2',
};

export const baseURL = {
  spotify: 'https://api.spotify.com/v1/',
  spotifyBackend: 'https://spclient.wg.spotify.com/open-backend-2/v1/',
  backend: 'http://api.micro100.de:3000/music-app/v1/',
  youtube: 'https://www.googleapis.com/youtube/v3/',
};
