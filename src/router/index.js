import Vue from 'vue';
import VueRouter from 'vue-router';
import { hasToken, getToken, toLogin } from '@/api';
import routes from './routes';

Vue.use(VueRouter);

/* eslint-disable no-new */
const router = new VueRouter({
  mode: 'history',
  routes,
  linkActiveClass: 'active',
  linkExactActiveClass: 'exact-active',
  scrollBehavior: () => ({
    y: 0,
  }),
});

/**
 * Check for spotify access token on each route change and get it if not already in vuex store.
 * Redirect to spotify login if no access token stored in vuex store.
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

export default router;
