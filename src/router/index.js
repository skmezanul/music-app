import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';

Vue.use(VueRouter);

/* eslint-disable no-new */

export default new VueRouter({
  mode: 'history',
  routes,
  linkActiveClass: '',
  linkExactActiveClass: 'active',
  scrollBehavior() {
    return {
      x: 0,
      y: 0,
    };
  },
});
