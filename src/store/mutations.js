export default {
  // set the api credentials (accessToken, refreshToken, expiry)
  SET_CREDENTIALS(state, payload) {
    const that = state.credentials;
    const expiryTime = Date.now() + (payload.expires_in * 1000);

    that.accessToken = payload.access_token;
    that.refreshToken = payload.refresh_token;
    that.expiryTime = expiryTime;
  },

  // push the current playback to state
  CURRENT_PLAYBACK(state, data) {
    const that = state;
    that.currentPlayback = data;
  },

  // push the current users profile or playlists to state
  CURRENT_USER(state, payload) {
    const that = state;
    let target;

    switch (payload.type) {
      default:
      case 'profile':
        target = 'currentUser';
        break;

      case 'playlists':
        target = 'playlists';
        break;
    }
    that[target] = payload.data;
  },

  // add or remove notice
  SHOW_NOTICE(state, payload) {
    const that = state;
    const notice = {
      type: payload.type,
      message: payload.message,
    };

    switch (payload.action) {
      default:
      case 'add':
        that.notices.unshift(notice);
        break;

      case 'remove':
        that.notices.shift();
        break;
    }
  },

  // push app settings to store
  SET_APP_SETTINGS(state, payload) {
    const that = state;
    that.settings[payload.setting] = payload.value;
  },

  // set stage content
  SET_STAGE(state, payload) {
    const that = state;
    that.stage = payload;
  },
};
