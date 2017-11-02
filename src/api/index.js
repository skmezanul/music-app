import Vue from 'vue';
import VueAxios from 'vue-axios';
import axios from 'axios';
import store from '@/store';
import router from '@/router';
import { credentials } from './config';

Vue.use(VueAxios, axios);

// get api token from vuex store
// eslint-disable-next-line
export const token = store.getters.getAccessToken;


// register spotify axios instance
const spotifyApi = axios.create({
  baseURL: 'https://api.spotify.com/v1/',
  headers: { Authorization: `Bearer ${token}` },
});

Vue.prototype.$spotifyApi = spotifyApi;

// register spotify backend axios instance
const spotifyBackendApi = axios.create({
  baseURL: 'https://spclient.wg.spotify.com/open-backend-2/v1/',
  headers: { Authorization: `Bearer ${credentials.backendApiToken}` },
});

Vue.prototype.$spotifyBackendApi = spotifyBackendApi;

// register youtube axios instance
const youtubeApi = axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3/',
  params: {
    part: 'snippet',
    key: credentials.youtubeApiKey,
  },
});

Vue.prototype.$youtubeApi = youtubeApi;

// register global spotify api interceptor
spotifyApi.interceptors.response.use(null, (err) => {
  const error = `Error: ${err.message}. -`;
  let message;

  switch (err.response.status) {
    default:
      message = `Error: ${err.message}.`;
      break;

    case '401':
      message = `${error} It is likely your access token has expired.`;
      // remove expired access token
      store.commit('ACCESS_TOKEN', {
        action: 'remove',
      });
      break;

    case '403':
      message = `${error} This action requires a Spotify Premium subscription.`;
      break;

    case '503':
      message = `${error} The server is currently unable to handle the request.`;
      break;

    case '404':
      message = `${error} The requested resource could not be found.`;
      break;
  }

  // commit notice to vuex store
  if (store.state.notices.length < 3) {
    store.commit('SHOW_NOTICE', {
      action: 'add',
      type: 'error',
      message,
    });
  }

  // return to previous route
  router.go(-1);
});
