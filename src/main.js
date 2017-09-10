import Vue from 'vue';
import i18n from './locale';
import store from './store';
import router from './router';
import './api';
import './components';
import app from './app';

/* eslint-disable no-new */
new Vue({
  el: '#app',
  i18n,
  router,
  store,
  render: h => h(app),
});

/* eslint-disable func-names */
Vue.prototype.$spotify = function (method, endpoint) {
  const that = this;
  const market = that.$store.state.currentUser.country;
  const country = that.$store.state.currentUser.country;
  let url = '';
  let q = '';
  let type = '';
  let data = 'data';

  if (endpoint === 'user') {
    url = `/users/${that.$route.params.id}`;
  }

  if (endpoint === 'album') {
    url = `/albums/${that.$route.params.id}`;
  }

  if (endpoint === 'playlist') {
    url = `/users/${that.$route.params.owner}/playlists/${that.$route.params.id}`;
  }

  if (endpoint === 'search') {
    url = '/search';
    q = that.$route.params.query;
    type = 'album,artist,track';
  }

  if (endpoint === 'categories') {
    url = '/browse/categories';
    data = 'data.categories';
  }

  if (endpoint === 'releases') {
    url = '/browse/new-releases';
  }

  if (endpoint === 'history') {
    url = '/me/player/recently-played';
    data = 'data.items';
  }

  that.$startLoading('fetching data');
  that.axios({
    method,
    url,
    params: {
      market,
      country,
      q,
      type,
    },
  }).then((res) => {
    that[endpoint] = res[data];
    that.$endLoading('fetching data');
  });
};
