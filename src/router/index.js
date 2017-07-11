import vue from 'vue'
import vuerouter from 'vue-router'
import routes from './routes'

vue.use(vuerouter)

const router = new vuerouter({
  mode: 'history',
  routes,
});

export default router;
