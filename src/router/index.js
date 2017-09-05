import Vue from 'vue';
import VueRouter from 'vue-router';
import { toLogin, hasToken, getToken } from '@/api/helpers';
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
 * Check for spotify access token on each route change and get it if not already in local storage.
 * Redirect to spotify login if no access token stored in local storage.
 */
router.beforeEach((to, from, next) => {
  if (!hasToken() && to.path !== '/callback') {
    toLogin();
  } else if (!hasToken() && to.path === '/callback') {
    getToken();
    window.location.reload();
  }
  next();
});

export default router;
