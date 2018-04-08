import { spotify, spotifyBackend } from '@/api/providers/spotify/';
import backend from '@/api/providers/backend/';

const actions = {
  // get featured playlists
  GET_FEATURED_PLAYLISTS: ({ rootGetters }) => {
    spotify({
      method: 'get',
      url: '/browse/featured-playlists',
      params: {
        country: rootGetters['user/getCountry'],
      },
    });
  },

  // get new releases
  GET_NEW_RELEASES: ({ rootGetters }) => {
    spotify({
      method: 'get',
      url: '/browse/new-releases',
      params: {
        country: rootGetters['user/getCountry'],
      },
    });
  },

  // get charts
  GET_CHARTS: () => {
    spotify({
      method: 'get',
      url: '/users/spotifycharts/playlists/37i9dQZEVXbMDoHDwVN2tF',
    });
  },

  // get categories
  GET_CATEGORIES: ({ rootGetters }) => {
    spotify({
      method: 'get',
      url: '/browse/categories',
      params: {
        limit: 15,
        locale: rootGetters['user/getLocale'],
      },
    });
  },

  // get artist info
  GET_ARTIST_INFO: (context, { id }) => {
    spotify({
      method: 'get',
      url: `/artists/${id}`,
    });
  },

  // get this artist's top tracks
  GET_TOP_TRACKS: ({ rootGetters }, { id }) => {
    spotify({
      method: 'get',
      url: `/artists/${id}/top-tracks`,
      params: {
        country: rootGetters['user/getCountry'],
      },
    });
  },

  // get artist's albums
  GET_ALBUMS: ({ rootGetters }, { id, type }) => {
    spotify({
      method: 'get',
      url: `/artists/${id}/albums`,
      params: {
        market: rootGetters['user/getMarket'],
        album_type: type,
      },
    });
  },

  // get artists related to another artist
  GET_RELATED_ARTISTS: (context, { id }) => {
    spotify({
      method: 'get',
      url: `/artists/${id}/related-artists`,
    });
  },

  // get current user's saved albums or tracks
  GET_MY_PROFILE: ({ rootGetters }, { type }) => {
    spotify({
      method: 'get',
      url: `/me/${type === 'profile' ? '' : type}`,
      params: {
        market: rootGetters['user/getMarket'],
      },
    });
  },

  // get current user's playback history
  GET_MY_PLAYBACK_HISTORY: (context, { type }) => {
    spotify({
      method: 'get',
      url: '/me/player/recently-played',
      params: {
        type,
      },
    });
  },

  // get single album
  GET_ALBUM: ({ rootGetters }, { id }) => {
    spotify({
      method: 'get',
      url: `/albums/${id}`,
      params: {
        market: rootGetters['user/getMarket'],
      },
    });
  },

  // get single playlist
  GET_PLAYLIST: ({ rootGetters }, { owner, id }) => {
    spotify({
      method: 'get',
      url: `/users/${owner}/playlists/${id}`,
      params: {
        market: rootGetters['user/getMarket'],
      },
    });
  },

  // get single category
  GET_CATEGORY_INFO: ({ rootGetters }, { id }) => {
    spotify({
      method: 'get',
      url: `/browse/categories/${id}`,
      params: {
        locale: rootGetters['user/getLocale'],
        country: rootGetters['user/getCountry'],
      },
    });
  },

  // get single category's playlists
  GET_CATEGORY_PLAYLISTS: ({ rootGetters }, { id }) => {
    spotify({
      method: 'get',
      url: `/browse/categories/${id}/playlists`,
      params: {
        locale: rootGetters['user/getLocale'],
        country: rootGetters['user/getCountry'],
      },
    });
  },

  // get user profile
  GET_USER: (context, { id }) => {
    spotify({
      method: 'get',
      url: `/users/${id}`,
    });
  },

  // check if current user if following artist or user
  IS_FOLLOWING_ARTIST_OR_USER: (context, { type, ids }) => {
    spotify({
      method: 'get',
      url: '/me/following/contains',
      params: {
        type,
        ids,
      },
    });
  },

  // follow or unfollow an artist or user
  FOLLOW_ARTIST_OR_USER: (context, { action, type, ids }) => {
    spotify({
      method: action === 'follow' ? 'put' : 'delete',
      url: '/me/following',
      params: {
        type,
        ids,
      },
    });
  },

  // check if current user if following playlist
  IS_FOLLOWING_PLAYLIST: (context, { ownerId, playlistId, ids }) => {
    spotify({
      method: 'get',
      url: `/users/${ownerId}/playlists/${playlistId}/followers/contains`,
      params: {
        ids,
      },
    });
  },

  // follow or unfollow a playlist
  FOLLOW_PLAYIST: (context, { action, ownerId, playlistId }) => {
    spotify({
      method: action === 'follow' ? 'put' : 'delete',
      url: `users/${ownerId}/playlists/${playlistId}/followers`,
    });
  },

  // get results for search query
  GET_SEARCH_RESULTS: ({ rootGetters }, { type, q }) => {
    spotify({
      method: 'get',
      url: '/search',
      params: {
        type,
        market: rootGetters['user/getMarket'],
        limit: 12,
        q,
      },
    });
  },

  // skip playback to previous or next track
  SKIP_TO: ({ rootGetters }, { direction }) => {
    spotify({
      method: 'post',
      url: `/me/player/${direction}`,
      params: {
        device_id: rootGetters['player/getDeviceId'],
      },
    });
  },

  // seek playback to position in track
  SEEK_TO: ({ rootGetters }, { position }) => {
    spotify({
      method: 'put',
      url: '/me/player/seek',
      params: {
        device_id: rootGetters['player/getDeviceId'],
        position_ms: position,
      },
    });
  },

  // set playback state and track
  SET_PLAYBACK: ({ rootGetters }, { state, uris }) => {
    spotify({
      method: 'put',
      url: `/me/player/${state}`,
      data: {
        uris,
      },
      params: {
        device_id: rootGetters['player/getDeviceId'],
      },
    });
  },

  // toggle repeat for playback
  TOGGLE_REPEAT: ({ rootGetters }) => {
    spotify({
      method: 'put',
      url: '/me/player/repeat',
      params: {
        state: 'context',
        device_id: rootGetters['player/getDeviceId'],
      },
    });
  },

  // set shuffle state for playback
  SET_SHUFFLE: ({ rootGetters }) => {
    spotify({
      method: 'put',
      url: '/me/player/shuffle',
      params: {
        state: !rootGetters['playback/getCurrentPlayback'].shuffle_state,
        device_id: rootGetters['player/getDeviceId'],
      },
    });
  },

  // get the current playback
  GET_PLAYBACK: ({ rootGetters }) => {
    spotify({
      method: 'get',
      url: '/me/player',
      params: {
        market: rootGetters['user/getMarket'],
      },
    });
  },

  // get additional artist info
  GET_ADDITIONAL_ARTIST_INFO: (context, { id }) => {
    spotifyBackend({
      method: 'get',
      url: `/artists/${id}`,
    });
  },

  // get url to authenticate the user
  GET_AUTH_URL: (context, { protocol, host }) => {
    backend({
      method: 'get',
      url: '/getAuthURL',
      params: {
        redirectURI: `${protocol}//${host}/login`,
      },
    });
  },

  // get access token
  GET_ACCESS_TOKEN: (context, { code }) => {
    backend({
      method: 'get',
      url: '/getToken',
      params: {
        code,
      },
    });
  },

  // refresh access token
  REFRESH_ACCESS_TOKEN: ({ rootGetters }) => {
    backend({
      method: 'get',
      url: '/refreshToken',
      params: {
        token: rootGetters['auth/getRefreshToken'],
      },
    });
  },
};

export default actions;
