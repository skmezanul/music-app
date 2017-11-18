import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store';
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
 * Clear stage state between route changes.
 */
router.afterEach((to, from) => {
  if (to.path !== from.path) {
    store.commit('SET_STAGE', {});
  }
});

export default router;
