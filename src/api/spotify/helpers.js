import store from '@/store';
import backend from '../providers/backend/';
import { credentials } from '../config';

const url = window.location;

/**
 * toLogin() helper function.
 * Redirects user to spotify login page with given scopes and redirect url.
 * User gets redirected to route /login after successful login.
 */
export function toLogin() {
  backend({
    method: 'get',
    url: `/getAuthURL?redirectURI=${url.protocol}//${url.host}/login`,
  }).then((res) => {
    url.href = res.data.url;
  });
}

/**
 * getToken() helper function.
 * Checks if token is in vuex store and returns it.
 */
export function getToken() {
  return credentials.accessToken;
}

/**
 * getToken() helper function.
 * Extracts token from url and saves it to vuex store.
 * Works only on /login route as its the route
 * spotify redirects the user to after successful login.
 */
export function storeToken() {
  // get code from url
  const code = url.href.split('&state')[0].split('code=')[1];

  if (code) {
    backend({
      method: 'get',
      url: `/getToken?code=${code}`,
    }).then((res) => {
      // store token in vuex store
      store.commit('SET_CREDENTIALS', res.data);
    });
  }
}
