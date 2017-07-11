import Vue from 'vue'
import Vuerouter from 'vue-router'
import routes from './routes'

Vue.use(Vuerouter)

const router = new Vuerouter({
  mode: 'history',
  routes,
});

export default router;
