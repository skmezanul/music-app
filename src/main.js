import Vue from 'vue'
import router from './router'
import components from './components'
import store from './store'
import app from './app.vue'

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(app)
})
