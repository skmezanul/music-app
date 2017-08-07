import Vue from 'vue';
import VueAxios from 'vue-axios';
import axios from 'axios';

Vue.use(VueAxios, axios);

// your api token goes here:
const token = '';

// you can get it from
// https://developer.spotify.com/web-api/console/post-next/
// remember to grant all permissions for the app to work properly.

// set default baseURL
Vue.axios.defaults.baseURL = 'https://api.spotify.com/v1/';

// set default authorization header
Vue.axios.defaults.headers.common.Authorization = `Bearer ${token}`;
