/* eslint-disable max-len */
import Vue from 'vue';
import axios from 'axios';
import { baseURL } from '../../config';

// register spotify axios instance
const spotify = axios.create({
  baseURL: baseURL.spotify,
});

Vue.prototype.$spotifyApi = spotify;

export default spotify;
