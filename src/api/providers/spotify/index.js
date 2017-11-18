import Vue from 'vue';
import axios from 'axios';
import { baseURL, credentials } from '../../config';

// register spotify axios instance
const spotify = axios.create({
  baseURL: baseURL.spotify,
  headers: {
    Authorization: `Bearer ${credentials.accessToken}`,
  },
});

Vue.prototype.$spotifyApi = spotify;

export default spotify;
