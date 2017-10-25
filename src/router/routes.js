// components for "browse"
const browseIndex = () => import(/* webpackChunkName: "browse" */ './views/browse/index');
const browseOverview = () => import(/* webpackChunkName: "browse" */ './views/browse/_overview');
const browseCharts = () => import(/* webpackChunkName: "browse" */ './views/browse/_charts');
const browseCategories = () => import(/* webpackChunkName: "browse" */ './views/browse/_categories');
const browseReleases = () => import(/* webpackChunkName: "browse" */ './views/browse/_releases');
const browseDiscover = () => import(/* webpackChunkName: "browse" */ './views/browse/_discover');

// components for "artist"
const artistIndex = () => import(/* webpackChunkName: "artist" */ './views/artist/index');
const artistOverview = () => import(/* webpackChunkName: "artist" */ './views/artist/_overview');
const artistRelated = () => import(/* webpackChunkName: "artist" */ './views/artist/_related');
const artistAbout = () => import(/* webpackChunkName: "artist" */ './views/artist/_about');

// components for "user"
const userIndex = () => import(/* webpackChunkName: "user" */ './views/user/index');
const userOverview = () => import(/* webpackChunkName: "user" */ './views/user/_overview');
const userPlaylists = () => import(/* webpackChunkName: "user" */ './views/user/_playlists');
const userFollowing = () => import(/* webpackChunkName: "user" */ './views/user/_following');

// components for "mylibrary"
const mylibraryHistory = () => import(/* webpackChunkName: "mylibrary" */ './views/mylibrary/history');
const mylibraryTracks = () => import(/* webpackChunkName: "mylibrary" */ './views/mylibrary/tracks');
const mylibraryAlbums = () => import(/* webpackChunkName: "mylibrary" */ './views/mylibrary/albums');

// component for single album
const album = () => import(/* webpackChunkName: "album" */ './views/single/album');

// component for single playlist
const playlist = () => import(/* webpackChunkName: "playlist" */ './views/single/playlist');

// component for single category
const category = () => import(/* webpackChunkName: "category" */ './views/single/category');

// component for search
const search = () => import(/* webpackChunkName: "search" */ './views/search');

// component for general settings
const settings = () => import(/* webpackChunkName: "settings" */ './views/settings');

// component for debugging
const debug = () => import(/* webpackChunkName: "debug" */ './views/debug');

export default [{
  path: '/browse',
  component: browseIndex,
  children: [{
    path: '',
    name: 'browse',
    meta: {
      compact: true,
    },
    component: browseOverview,
  },
  {
    path: 'charts',
    name: 'browseCharts',
    meta: {
      compact: true,
    },
    component: browseCharts,
  },
  {
    path: 'categories',
    name: 'browseCategories',
    meta: {
      compact: true,
    },
    component: browseCategories,
  },
  {
    path: 'releases',
    name: 'browseReleases',
    meta: {
      compact: true,
    },
    component: browseReleases,
  },
  {
    path: 'discover',
    name: 'browseDiscover',
    meta: {
      compact: true,
    },
    component: browseDiscover,
  },
  ],
},
{
  path: '/artist/:id',
  component: artistIndex,
  children: [{
    path: '',
    name: 'artist',
    meta: {
      buttons: true,
    },
    component: artistOverview,
  },
  {
    path: 'related',
    name: 'artistRelated',
    meta: {
      buttons: true,
      compact: true,
    },
    component: artistRelated,
  },
  {
    path: 'about',
    name: 'artistAbout',
    meta: {
      buttons: true,
      compact: true,
    },
    component: artistAbout,
  },
  ],
},
{
  path: '/user/:id',
  component: userIndex,
  children: [{
    path: '',
    name: 'user',
    meta: {
      compact: true,
      cover: true,
    },
    component: userOverview,
  },
  {
    path: 'playlists',
    name: 'userPlaylists',
    meta: {
      compact: true,
      cover: true,
    },
    component: userPlaylists,
  },
  {
    path: 'following',
    name: 'userFollowing',
    meta: {
      compact: true,
      cover: true,
    },
    component: userFollowing,
  },
  ],
},
{
  path: '/album/:id',
  name: 'album',
  meta: {
    compact: true,
    cover: true,
    buttons: true,
  },
  component: album,
},
{
  path: '/playlist/:owner/:id',
  name: 'playlist',
  meta: {
    compact: true,
    cover: true,
    buttons: true,
  },
  component: playlist,
},
{
  path: '/category/:id',
  name: 'category',
  meta: {
    compact: true,
  },
  component: category,
},
{
  path: '/search/:query',
  name: 'search',
  meta: {
    compact: true,
  },
  component: search,
},
{
  path: '/history',
  name: 'mylibraryHistory',
  meta: {
    buttons: true,
  },
  component: mylibraryHistory,
},
{
  path: '/tracks',
  name: 'mylibraryTracks',
  meta: {
    buttons: true,
  },
  component: mylibraryTracks,
},
{
  path: '/albums',
  name: 'mylibraryAlbums',
  meta: {
    buttons: true,
    compact: true,
  },
  component: mylibraryAlbums,
},
{
  path: '/settings',
  name: 'settings',
  meta: {
    compact: true,
  },
  component: settings,
},
{
  path: '/debug',
  name: 'debug',
  meta: {
    compact: true,
  },
  component: debug,
},
];
