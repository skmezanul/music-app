import Vue from 'vue';
import VueAxios from 'vue-axios';
import axios from 'axios';
import queryString from 'query-string';
import router from '../router';

Vue.use(VueAxios, axios);

// get api token from local storage
const token = localStorage.getItem('spotify_token');

// set default authorization header
Vue.axios.defaults.headers.common.Authorization = `Bearer ${token}`;

// set default baseURL
Vue.axios.defaults.baseURL = 'https://api.spotify.com/v1/';

router.beforeEach((to, from, next) => {
  // check for spotify access token and get it if not already in local storage
  // redirect to spotify login if no access token stored in local storage
  const url = window.location;
  const req = {
    // your spotify api client id
    // get it from https://developer.spotify.com/my-applications/
    client_id: '',

    // url the user gets redirected to after logged in with spotify
    redirect_uri: `${url.protocol}//${url.host}/callback`,

    // scopes to grant the app access to specific data
    scope: ['playlist-read-private', 'user-library-read', 'user-read-private', 'user-top-read', 'user-read-playback-state', 'user-modify-playback-state', 'user-read-currently-playing'],

    // get a token back from the spotify api
    response_type: 'token',
  };

  // convert request to string
  const str = queryString.stringify(req);
  const storedToken = localStorage.getItem('spotify_token');

  if (!storedToken && to.path !== '/callback') {
    // redirect to spotify login page
    url.href = `https://accounts.spotify.com/authorize?${str}`;
  } else if (!storedToken && to.path === '/callback') {
    // get token from url
    const tokenFromUrl = url.href.split('&token_type')[0].split('access_token=')[1];

    // store token in local storage
    localStorage.setItem('spotify_token', tokenFromUrl);
    next();
  }
  next();
});
