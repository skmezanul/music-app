import Vue from 'vue';
import VueRouter from 'vue-router';
import { hasToken } from '@/api';
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
  if (to.meta.requiresAuth) {
    if (!hasToken() && to.name !== 'login') {
      next({
        name: 'login',
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
