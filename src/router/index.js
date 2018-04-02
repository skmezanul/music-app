import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes,
  linkActiveClass: 'is-active',
  linkExactActiveClass: 'is-exact-active',
});

export default router;
