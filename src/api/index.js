import Vue from 'vue';
import VueAxios from 'vue-axios';
import axios from 'axios';
import store from '@/store';
import { toLogin } from './helpers';

Vue.use(VueAxios, axios);

/**
 * Your spotify clientID goes here
 * Get it from https://developer.spotify.com/my-applications
 * Create an application if not already done.
 */
export const clientId = '';

// scopes to grant the api access to user data
export const scope = ['playlist-read-private', 'user-library-read', 'user-read-private', 'user-top-read', 'user-read-playback-state', 'user-modify-playback-state', 'user-read-currently-playing'];

// get api token from local storage
const token = localStorage.getItem('spotify_token');

// set default authorization header
Vue.axios.defaults.headers.common.Authorization = `Bearer ${token}`;

// set default baseURL
Vue.axios.defaults.baseURL = 'https://api.spotify.com/v1/';

// set default axios errors
Vue.axios.interceptors.response.use(null, (err) => {
  let message = `Error: ${err.message}.`;
  if (err.response.status === 401) {
    message = `Error: ${err.message}. - It is likely your access token has expired.`;
    toLogin();
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
