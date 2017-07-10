import Vue from 'vue'
import VueFire from 'vuefire'
import firebase from 'firebase'
import router from './router'
import components from './components'
import store from './store'
import app from './app.vue'

Vue.use(VueFire)

var config = {
    apiKey: "AIzaSyApFYAyjfvuYeCqH2os5i7A0ER9Nr6hkqw",
    authDomain: "music-app-e05c2.firebaseapp.com",
    databaseURL: "https://music-app-e05c2.firebaseio.com",
    projectId: "music-app-e05c2",
    storageBucket: "music-app-e05c2.appspot.com",
    messagingSenderId: "120610973312"
};
var firebaseApp = firebase.initializeApp(config)
var db = firebaseApp.database()

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(app)
})
