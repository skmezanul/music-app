import Vue from 'vue';
import axios from 'axios';
import { baseURL } from '../../config';

// register spotify backend axios instance
const spotifyBackend = axios.create({
  baseURL: baseURL.spotifyBackend,
});

Vue.prototype.$spotifyBackendApi = spotifyBackend;

export default spotifyBackend;
