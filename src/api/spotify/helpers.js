import store from '@/store';
import { parse } from 'query-string';
import backend from '../providers/backend/';

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
  }).catch((err) => {
    throw new Error(err);
  });
}

/**
 * storeToken() helper function.
 * Sends code returned from spotify login to backend
 * and saves returned accessToken to vuex store.
 * Works only on /login route as its the route
 * spotify redirects the user to after successful login.
 */
export function storeToken(next) {
  // get code from url
  const { code } = parse(url.search);

  // exchange code for access token by sending it to the backend
  if (code) {
    backend({
      method: 'get',
      url: `/getToken?code=${code}`,
    }).then((res) => {
      // store token in vuex store
      store.commit('SET_CREDENTIALS', res.data);
      url.reload();
      next();
    }).catch((err) => {
      throw new Error(err);
    });
  } else {
    throw new Error("Missing paremeter 'code'.");
  }
}
