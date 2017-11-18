import router from '@/router';
import { credentials } from '../config';
import { storeToken, toLogin } from './helpers';

const token = credentials.accessToken;

/**
 * Check for spotify access token on each route change and get it if not already in vuex store.
 * Redirect to spotify login if no access token is stored.
 */
router.beforeEach((to, from, next) => {
  if (!token && to.name !== 'login') {
    // redirect to spotify login page
    toLogin();
  } else if (!token && to.name === 'login') {
    // get token from url
    storeToken(next);
  }
  next();
});
