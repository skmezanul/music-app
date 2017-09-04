import Vue from 'vue';
import VueAxios from 'vue-axios';
import axios from 'axios';

Vue.use(VueAxios, axios);

// get api token from local storage
const token = localStorage.getItem('spotify_token');

// set default authorization header
Vue.axios.defaults.headers.common.Authorization = `Bearer ${token}`;

// set default baseURL
Vue.axios.defaults.baseURL = 'https://api.spotify.com/v1/';
