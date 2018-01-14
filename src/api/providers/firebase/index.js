import Vue from 'vue';
import * as firebase from 'firebase';
import { firebaseConfig } from '../../config';

const firebaseInstance = firebase.initializeApp(firebaseConfig),
  database = firebaseInstance.database();

Vue.prototype.$database = database;
