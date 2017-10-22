import Vue from 'vue';
import VueAxios from 'vue-axios';
import axios from 'axios';
import store from '@/store';
import { credentials } from './config';

Vue.use(VueAxios, axios);

// get api token from vuex store
// eslint-disable-next-line
export const token = store.getters.getAccessToken;

Vue.prototype.$spotifyApi = axios.create({
  baseURL: 'https://api.spotify.com/v1/',
  headers: { Authorization: `Bearer ${token}` },
});

Vue.prototype.$spotifyBackendApi = axios.create({
  baseURL: 'https://spclient.wg.spotify.com/open-backend-2/v1/',
  headers: { Authorization: `Bearer ${credentials.backendApiToken}` },
});

Vue.prototype.$youtubeApi = axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3/',
  params: {
    part: 'snippet',
    key: credentials.youtubeApiKey,
  },
});

// set default axios errors
Vue.axios.interceptors.response.use(null, (err) => {
  let message = `Error: ${err.message}.`;
  if (err.response.status === 401) {
    message = `Error: ${err.message}. - It is likely your access token has expired.`;
    // remove expired access token
    store.commit('REMOVE_TOKEN');
  }
  if (err.response.status === 403) {
    message = `Error: ${err.message}. - This action requires a Spotify Premium subscription.`;
  }
  if (err.response.status === 503) {
    message = `Error: ${err.message}. - The server is currently unable to handle the request.`;
  }
  if (err.response.status === 404) {
    message = `Error: ${err.message}. - The requested resource could not be found.`;
  }
  store.commit('ADD_NOTICE', message);
});
