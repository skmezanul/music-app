import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store';
import { hasToken, getToken, toLogin } from '@/api/helpers';
import routes from './routes';

Vue.use(VueRouter);

/* eslint-disable no-new */
const router = new VueRouter({
  mode: 'history',
  routes,
  linkActiveClass: 'active',
  linkExactActiveClass: 'exact-active',
});

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

/**
 * Clear stage state between route changes.
 */
router.afterEach((to, from) => {
  if (from.matched[0].path !== to.matched[0].path) {
    store.commit('SET_STAGE', {});
  }
});

export default router;
