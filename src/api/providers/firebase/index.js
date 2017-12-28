import Vue from 'vue';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { firebaseConfig } from '../../config';

const firebaseInstance = firebase.initializeApp(firebaseConfig),
  database = firebaseInstance.firestore();

Vue.prototype.$database = database;
