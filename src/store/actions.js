import Vue from 'vue';
import router from '@/router';

export default {

  // get the current user's profile
  GET_CURRENT_USER({ commit }, dataToFetch) {
    let url;

    switch (dataToFetch) {
      case 'playlists':
        url = '/me/playlists';
        break;
      case 'profile':
      default:
        url = '/me';
    }

    Vue.prototype.$spotifyApi({
      method: 'get',
      url,
    }).then((res) => {
      commit('CURRENT_USER', {
        dataToFetch,
        data: res.data,
      });
    });
  },

  // get the current playback
  GET_CURRENT_PLAYBACK({ commit, dispatch }) {
    setTimeout(() => {
      Vue.prototype.$spotifyApi({
        method: 'get',
        url: '/me/player',
      }).then((res) => {
        // push current playback to store
        commit('CURRENT_PLAYBACK', res.data);

        // re-fetch after track ended
        dispatch('REFETCH_TIMER', {
          playbackProgress: res.data.progress_ms,
          trackDuration: res.data.item.duration_ms,
        });
      });
    }, 500);
  },

  // TODO: refetch timer
  REFETCH_TIMER({ dispatch }, payload) {
    const { trackDuration, playbackProgress } = payload;
    const remainingTime = (trackDuration - playbackProgress);

    new Promise(resolve => setTimeout(resolve, remainingTime)).then(() => {
      dispatch('GET_CURRENT_PLAYBACK');
    });
  },

  // skip to previous / next track
  SKIP({ dispatch, getters }, payload) {
    const { direction } = payload;

    if (direction) {
      Vue.prototype.$spotifyApi({
        method: 'post',
        url: `/me/player/${direction}`,
        params: {
          device_id: getters.getDeviceId,
        },
      }).then(() => {
        dispatch('GET_CURRENT_PLAYBACK');
      });
    }
  },

  // resume / pause the current playback or change playing track
  SET_PLAYBACK({ dispatch, getters }, payload) {
    let uris;

    // play track if trackid in request payload and state set to 'play'
    const playTrack = payload.state === 'play' && payload.trackid;
    if (playTrack) {
      uris = [`spotify:track:${payload.trackid}`];
    }

    Vue.prototype.$spotifyApi({
      method: 'put',
      url: `/me/player/${payload.state}`,
      data: {
        uris,
      },
      params: {
        device_id: getters.getDeviceId,
      },
    }).then(() => {
      dispatch('GET_CURRENT_PLAYBACK');
    });
  },

  // toggle repeat for the current playback
  TOGGLE_REPEAT({ getters }) {
    Vue.prototype.$spotifyApi({
      method: 'put',
      url: '/me/player/repeat',
      params: {
        state: 'context',
        device_id: getters.getDeviceId,
      },
    });
  },

  // set shuffle state for the current playback
  SET_SHUFFLE({ getters }) {
    Vue.prototype.$spotifyApi({
      method: 'put',
      url: '/me/player/shuffle',
      params: {
        state: !getters.getCurrentPlayback.shuffle_state,
        device_id: getters.getDeviceId,
      },
    });
  },

  // redirect user to spotify login
  LOGIN_USER({ state }) {
    const { protocol, host } = window.location;

    Vue.prototype.$backendApi({
      method: 'get',
      url: `/getAuthURL?redirectURI=${protocol}//${host}/login`,
    }).then((res) => {
      if (!state.credentials.accessToken) window.location.href = res.data.url;
    });
  },

  // get token from backend and save it in vuex store
  GET_TOKEN({ commit, state }, payload) {
    const { refreshToken } = state.credentials;
    const { code, action } = payload;
    let url;

    switch (action) {
      case 'refresh':
        url = `/refreshToken?token=${refreshToken}`;
        break;
      case 'get':
      default:
        url = `/getToken?code=${code}`;
    }

    if (code || refreshToken) {
      Vue.prototype.$backendApi({
        method: 'get',
        url,
      }).then((res) => {
        commit('SET_CREDENTIALS', res.data);
        router.push({
          name: 'browse',
        });
      });
    }
  },
};
