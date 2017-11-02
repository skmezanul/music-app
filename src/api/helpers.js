import store from '@/store';
import { stringify } from 'query-string';
import { credentials, scope } from './config';
import { token } from './';

/**
 * Global toLogin() helper function.
 * Redirects user to spotify login page with given scopes and redirect url.
 * User gets redirected to route /login after successful login.
 */
export function toLogin() {
  const url = window.location;
  const req = {
    // change in config.js
    client_id: credentials.clientId,
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
 * Global hasToken() helper function.
 * Checks if token is in vuex store and returns a boolean.
 */
export function hasToken() {
  const storedToken = token && typeof token !== 'undefined';
  return storedToken;
}

/**
 * Global getToken() helper function.
 * Extracts token from url and saves it to vuex store.
 * Works only on /login route as its the route
 * spotify redirects the user to after successful login.
 */
export function getToken() {
  const url = window.location.href;

  // get token from url
  const tokenFromurl = url.split('&token_type')[0].split('access_token=')[1];

  // store token in local storage
  store.commit('ACCESS_TOKEN', {
    action: 'set',
    token: tokenFromurl,
  });
}
