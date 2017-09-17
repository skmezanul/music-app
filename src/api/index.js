import Vue from 'vue';
import VueAxios from 'vue-axios';
import axios from 'axios';
import store from '@/store';
import { stringify } from 'query-string';
import { clientId, scope } from './config';

Vue.use(VueAxios, axios);

/**
 * Global toLogin() function.
 * Redirects user to spotify login page with given scopes and redirect url.
 * User gets redirected to route /callback after successful login.
 */
export function toLogin() {
  const url = window.location;
  const req = {
    // change the clientID and scope in index.js
    client_id: clientId,
    redirect_uri: `${url.protocol}//${url.host}/login`,
    scope,
    response_type: 'token',
  };

  // convert request to string
  const str = stringify(req);

  // redirect to spotify login page
  url.href = `https://accounts.spotify.com/authorize?${str}`;
}

/**
 * Global hasToken() function.
 * Checks if token is in local storage and returns a boolean.
 */
export function hasToken() {
  const storedToken = localStorage.getItem('spotify_token');
  return storedToken;
}

/**
 * Global getToken() function.
 * Extracts token from url and saves it to local storage.
 * Works only on /callback route as its the route
 * spotify redirects the user to after successful login.
 */
export function getToken() {
  const url = window.location.href;

  // get token from url
  const tokenFromurl = url.split('&token_type')[0].split('access_token=')[1];

  // store token in local storage
  localStorage.setItem('spotify_token', tokenFromurl);
}

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
