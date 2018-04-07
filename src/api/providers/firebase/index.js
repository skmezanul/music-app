import Vue from 'vue';
import * as firebase from 'firebase';

const firebaseInstance = firebase.initializeApp({
    apiKey: 'AIzaSyApFYAyjfvuYeCqH2os5i7A0ER9Nr6hkqw',
    authDomain: 'music-app-e05c2.firebaseapp.com',
    databaseURL: 'https://music-app-e05c2.firebaseio.com/',
  }),
  database = firebaseInstance.database();

Vue.prototype.$database = database;
