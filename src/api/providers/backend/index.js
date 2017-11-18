import Vue from 'vue';
import axios from 'axios';
import { baseURL } from '../../config';

// register music-app backend axios instance
const backend = axios.create({
  baseURL: baseURL.backend,
});

Vue.prototype.$backendApi = backend;

export default backend;
