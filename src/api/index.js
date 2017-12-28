import Vue from 'vue';
import VueAxios from 'vue-axios';
import axios from 'axios';

// import providers
import './providers/spotify/';
import './providers/spotify/backend';
import './providers/backend/';
import './providers/youtube/';
import './providers/firebase/';

// import interceptors
import './spotify/interceptors/response';
import './spotify/interceptors/request';

// register axios
Vue.use(VueAxios, axios);
