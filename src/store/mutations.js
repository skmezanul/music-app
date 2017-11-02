export default {
  // set or remove the access token
  ACCESS_TOKEN(state, payload) {
    const that = state;
    let accessToken;

    switch (payload.action) {
      default:
      case 'set':
        accessToken = payload.token;
        break;

      case 'remove':
        accessToken = '';
        break;
    }
    that.accessToken = accessToken;
  },

  // push the current playback to state
  CURRENT_PLAYBACK(state, data) {
    const that = state;
    that.currentPlayback = data;
  },

  // push the current users profile or playlists to state
  CURRENT_USER(state, payload) {
    const that = state;
    let type;

    switch (payload.type) {
      default:
      case 'profile':
        type = 'currentUser';
        break;

      case 'playlists':
        type = 'playlists';
        break;
    }
    that[type] = payload.data;
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
};
