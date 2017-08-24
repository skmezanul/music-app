import Vue from 'vue';
import Vuex from 'vuex';
import { createVuexLoader } from 'vuex-loading';

const VuexLoading = createVuexLoader({
  moduleName: 'loading',
  componentName: 'ma-loading',
  className: 'loading',
});

Vue.use(Vuex);
Vue.use(VuexLoading);

/* eslint-disable no-new */

const store = new Vuex.Store({
  strict: true,
  state: {
    currentPlayback: '',
    currentUser: [],
    deviceID: '',
    notices: [],
    scrollPosition: '',
  },
  mutations: {
    CURRENT_PLAYBACK(state, data) {
      const thisState = state;
      thisState.currentPlayback = data;
    },
    CURRENT_USER(state, data) {
      const thisState = state;
      thisState.currentUser = data;
    },
    DEVICE_ID(state, data) {
      const thisState = state;
      thisState.deviceID = data;
    },
    ADD_NOTICE(state, message) {
      const thisState = state;
      thisState.notices.unshift(message);
    },
    REMOVE_NOTICE(state, index) {
      const thisState = state;
      thisState.notices.splice(index, 1);
    },
    SCROLL_POSITION(state, position) {
      const thisState = state;
      thisState.scrollPosition = position;
    },
  },
  actions: {
    // get the current user's info
    GET_CURRENT_USER() {
      Vue.axios({
        method: 'get',
        url: '/me',
      }).then((res) => {
        store.commit('CURRENT_USER', res.data);
      }).catch(() => {
        store.commit('ADD_NOTICE', this.$t('errors.currentuser'));
      });
    },

    // get my devices
    GET_MY_DEVICES() {
      Vue.axios({
        method: 'get',
        url: '/me/player/devices',
      }).then((res) => {
        store.commit('DEVICE_ID', res.data.devices[0].id);
      }).catch(() => {
        store.commit('ADD_NOTICE', this.$t('errors.devices'));
      });
    },

    // get the current playback
    GET_CURRENT_PLAYBACK() {
      Vue.axios({
        method: 'get',
        url: '/me/player',
      }).then((res) => {
        store.commit('CURRENT_PLAYBACK', res.data);
      }).catch(() => {
        store.commit('ADD_NOTICE', this.$t('errors.currentplayback'));
      });
    },
  },
  plugins: [VuexLoading.Store],
});

export default store;
