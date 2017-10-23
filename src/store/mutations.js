export default {
  SET_TOKEN(state, token) {
    const thisState = state;
    thisState.accessToken = token;
  },
  REMOVE_TOKEN(state) {
    const thisState = state;
    thisState.accessToken = '';
  },
  CURRENT_PLAYBACK(state, data) {
    const thisState = state;
    thisState.currentPlayback = data;
  },
  CURRENT_USER(state, payload) {
    const thisState = state;
    if (payload.type === 'playlists') {
      thisState.playlists = payload.data.items;
    } else {
      thisState.currentUser = payload.data;
    }
  },
  TOGGLE_LARGE_COVER(state) {
    const thisState = state;
    thisState.largeCover = !thisState.largeCover;
  },
  ADD_NOTICE(state, message) {
    state.notices.unshift(message);
  },
  REMOVE_NOTICE(state, index) {
    state.notices.splice(index, 1);
  },
};
