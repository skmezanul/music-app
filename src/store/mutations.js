export default {
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
};
