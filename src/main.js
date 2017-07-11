import Vue from 'vue'
import components from './components'
import app from './app.vue'
import store from './store'
import router from './router'

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(app)
})
