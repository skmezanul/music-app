export default {
  SET_TOKEN(state, token) {
    const thisState = state;
    thisState.accessToken = token;
  },
  CURRENT_PLAYBACK(state, data) {
    const thisState = state;
    thisState.currentPlayback = data;
  },
  CURRENT_USER(state, data) {
    const thisState = state;
    thisState.currentUser = data;
  },
  TOGGLE_LARGE_COVER(state) {
    const thisState = state;
    thisState.largeCover = !thisState.largeCover;
  },
  ADD_NOTICE(state, message) {
    const thisState = state;
    thisState.notices.unshift(message);
  },
  REMOVE_NOTICE(state, index) {
    const thisState = state;
    thisState.notices.splice(index, 1);
  },
};
