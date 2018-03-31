/* eslint-disable max-len */
import store from '@/store';
import spotify from '../providers/spotify/';

const country = store.getters['user/getCountry'],
  locale = store.getters['user/getLocale'],
  market = store.getters['user/getMarket'];

export default {
  // get featured playlists
  getFeaturedPlaylists: () => spotify({ method: 'get', url: '/browse/featured-playlists', params: { country } }),

  // get new releases
  getNewReleases: () => spotify({ method: 'get', url: '/browse/new-releases', params: { country } }),

  // get charts
  getCharts: () => spotify({ method: 'get', url: '/users/spotifycharts/playlists/37i9dQZEVXbMDoHDwVN2tF' }),

  // get categories
  getCategories: () => spotify({ method: 'get', url: '/browse/categories', params: { limit: 15, locale } }),

  // get artist info
  getArtistInfo: id => spotify({ method: 'get', url: `/artists/${id}` }),

  // get this artist's top tracks
  getTopTracks: id => spotify({ method: 'get', url: `/artists/${id}/top-tracks`, params: { country } }),

  // get artist's albums
  getAlbums: (id, type) => spotify({ method: 'get', url: `/artists/${id}/albums`, params: { market, album_type: type } }),

  // get artists related to another artist
  getRelatedArtists: id => spotify({ method: 'get', url: `/artists/${id}/related-artists` }),

  // get current user's saved albums or tracks
  getMySaved: type => spotify({ method: 'get', url: `/me/${type}`, params: { market } }),

  // get current user's playback history
  getMyPlaybackHistory: type => spotify({ method: 'get', url: '/me/player/recently-played', params: { type } }),

  // get single album
  getAlbum: id => spotify({ method: 'get', url: `/albums/${id}`, params: { market } }),

  // get single playlist
  getPlaylist: (owner, id) => spotify({ method: 'get', url: `/users/${owner}/playlists/${id}`, params: { market } }),

  // get single category
  getCategoryInfo: id => spotify({ method: 'get', url: `/browse/categories/${id}`, params: { locale, country } }),

  // get single category's playlists
  getCategoryPlaylists: id => spotify({ method: 'get', url: `/browse/categories/${id}/playlists`, params: { locale, country } }),

  // get user profile
  getUser: id => spotify({ method: 'get', url: `/users/${id}` }),

  // check if current user if following artist or user
  isFollowing: params => spotify({ method: 'get', url: '/me/following/contains', params }),

  // check if current user if following artist or user
  getSearchResults: (type, q) => spotify({ method: 'get', url: '/search', params: { type, market, limit: 12, q } }),
};
