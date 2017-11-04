import Vue from 'vue';
import store from '@/store';
import token from './';

/**
 * Global toLogin() helper function.
 * Redirects user to spotify login page with given scopes and redirect url.
 * User gets redirected to route /login after successful login.
 */
export function toLogin() {
  const url = window.location;
  Vue.prototype.$backendApi({
    method: 'get',
    url: `/getAuthURL?redirectURI=${url.protocol}//${url.host}/login`,
  }).then((res) => {
    url.href = res.data.url;
  });
}

/**
 * Global hasToken() helper function.
 * Checks if token is in vuex store and returns a boolean.
 */
export function hasToken() {
  const storedToken = token;
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

  // get code from url
  const code = url.split('&state')[0].split('code=')[1];

  if (code) {
    Vue.prototype.$backendApi({
      method: 'get',
      url: `/getToken?code=${code}`,
    }).then((res) => {
      // store token in vuex store
      store.commit('SET_CREDENTIALS', res.data);
    });
  }
}
