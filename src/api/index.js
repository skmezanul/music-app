import Vue from 'vue';
import VueAxios from 'vue-axios';
import axios from 'axios';

Vue.use(VueAxios, axios);

/**
 * Your spotify clientID goes here
 * Get it from https://developer.spotify.com/my-applications
 * Create an application if not already done.
 */
export const clientId = '';

// scopes to grant the api access to user data
export const scope = ['playlist-read-private', 'user-library-read', 'user-read-private', 'user-top-read', 'user-read-playback-state', 'user-modify-playback-state', 'user-read-currently-playing'];

// get api token from local storage
const token = localStorage.getItem('spotify_token');

// set default authorization header
Vue.axios.defaults.headers.common.Authorization = `Bearer ${token}`;

// set default baseURL
Vue.axios.defaults.baseURL = 'https://api.spotify.com/v1/';
