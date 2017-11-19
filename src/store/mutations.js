export default {
  // set the api credentials (accessToken, refreshToken, expiry)
  SET_CREDENTIALS(state, payload) {
    const self = state.credentials;
    const { accessToken, refreshToken, expiresIn } = payload;
    if (accessToken) self.accessToken = accessToken;
    if (refreshToken) self.refreshToken = refreshToken;
    if (expiresIn) {
      const expiryTime = Date.now() + (payload.expires_in * 1000);
      self.expiryTime = expiryTime;
    }
  },

  // push the current playback to store
  CURRENT_PLAYBACK(state, data) {
    const self = state;
    self.currentPlayback = data;
  },

  // push the current users profile, playlists or following to store
  CURRENT_USER(state, payload) {
    const self = state;
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

    self[targetState] = payload.data;
  },

  // add or remove notice
  NOTICE(state, payload) {
    const self = state;
    const notice = {
      type: payload.type,
      message: payload.message,
    };

    switch (payload.action) {
      default:
      case 'add':
        self.notices.unshift(notice);
        break;
      case 'remove':
        self.notices.shift();
        break;
    }
  },

  // push app settings to store
  SET_APP_SETTINGS(state, payload) {
    const self = state;
    self.settings[payload.setting] = payload.value;
  },

  // push stage content to store
  SET_STAGE(state, payload) {
    const self = state;
    self.stage = payload;
  },
};
