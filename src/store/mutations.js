export default {
  ACCESS_TOKEN(state, payload) {
    const thisState = state;
    let accessToken = payload.token;
    if (payload.action === 'remove') {
      accessToken = '';
    }
    thisState.accessToken = accessToken;
  },
  CURRENT_PLAYBACK(state, data) {
    const thisState = state;
    thisState.currentPlayback = data;
  },
  CURRENT_USER(state, payload) {
    const thisState = state;
    let type = 'currentUser';
    if (payload.type === 'playlists') {
      type = 'playlists';
    }
    thisState[type] = payload.data;
  },
  ADD_NOTICE(state, message) {
    state.notices.unshift(message);
  },
  REMOVE_NOTICE(state, index) {
    state.notices.splice(index, 1);
  },
  SET_APP_SETTINGS(state, payload) {
    const that = state;
    that.settings[payload.setting] = payload.value;
  },
};
