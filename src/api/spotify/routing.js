import router from '@/router';
import { getToken, storeToken, toLogin } from './helpers';

/**
 * Check for spotify access token on each route change and get it if not already in vuex store.
 * Redirect to spotify login if no access token is stored.
 */
router.beforeEach((to, from, next) => {
  if (!getToken() && to.path !== '/login') {
    // redirect to spotify login page
    toLogin();
  } else if (!getToken() && to.path === '/login') {
    // get token from url
    storeToken();
    next();
  }
  next();
});
