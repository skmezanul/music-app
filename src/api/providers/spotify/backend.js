import Vue from 'vue';
import axios from 'axios';
import { baseURL, credentials } from '../../config';

// register spotify backend axios instance
const spotifyBackend = axios.create({
  baseURL: baseURL.spotifyBackend,
  headers: {
    Authorization: `Bearer ${credentials.spotifyBackendToken}`,
  },
});

Vue.prototype.$spotifyBackendApi = spotifyBackend;

export default spotifyBackend;
