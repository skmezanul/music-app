import Vue from 'vue';
import VueAxios from 'vue-axios';
import axios from 'axios';
import VueApiRequest from 'vue-api-request';
import loader from '@/components/loader';
import store from '@/store';

// import providers
import './providers/spotify/';
import './providers/backend/';
import './providers/youtube/';

// import endpoints
import endpoints from './endpoints';

// register axios
Vue.use(VueAxios, axios);

// register loader
VueApiRequest.addLoader('ma-loader', loader);

// add endpoints
VueApiRequest.setAPI(endpoints);

// options for api-request plugin
const options = {
  resp: 'data',
  spinner: 'ma-loader',
  effect: '',
  onError: (err) => {
    store.commit('app/SET_NOTICE', {
      action: 'add',
      type: 'error',
      message: `Error: ${err.message}.`,
    });
  },
};

// register api-request plugin
Vue.use(VueApiRequest, options);
