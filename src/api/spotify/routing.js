import router from '@/router';
import { hasToken, getToken, toLogin } from './helpers';

/**
 * Check for spotify access token on each route change and get it if not already in vuex store.
 * Redirect to spotify login if no access token is stored.
 */
router.beforeEach((to, from, next) => {
  if (!hasToken() && to.path !== '/login') {
    // redirect to spotify login page
    toLogin();
  } else if (!hasToken() && to.path === '/login') {
    // get token from url
    getToken();
    next();
  }
  next();
});
