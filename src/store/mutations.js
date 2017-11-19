export default {
  // set the api credentials (accessToken, refreshToken, expiry)
  SET_CREDENTIALS(state, payload) {
    const that = state.credentials;
    const { accessToken, refreshToken, expiresIn } = payload;
    if (accessToken) that.accessToken = accessToken;
    if (refreshToken) that.refreshToken = refreshToken;
    if (expiresIn) {
      const expiryTime = Date.now() + (payload.expires_in * 1000);
      that.expiryTime = expiryTime;
    }
  },

  // push the current playback to store
  CURRENT_PLAYBACK(state, data) {
    const that = state;
    that.currentPlayback = data;
  },

  // push the current users profile, playlists or following to store
  CURRENT_USER(state, payload) {
    const that = state;
    let targetState;

    switch (payload.dataToFetch) {
      case 'profile':
      default:
        targetState = 'currentUser';
        break;
      case 'playlists':
        targetState = 'playlists';
        break;
    }

    that[targetState] = payload.data;
  },

  // add or remove notice
  NOTICE(state, payload) {
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

  // push stage content to store
  SET_STAGE(state, payload) {
    const that = state;
    that.stage = payload;
  },
};
