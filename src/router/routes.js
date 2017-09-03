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

// components for "mylibrary"
const mylibraryHistory = () => import(/* webpackChunkName: "mylibrary" */ './views/mylibrary/history');
const mylibraryTracks = () => import(/* webpackChunkName: "mylibrary" */ './views/mylibrary/tracks');

// component for single album
const album = () => import(/* webpackChunkName: "album" */ './views/single/album');

// component for single playlist
const playlist = () => import(/* webpackChunkName: "playlist" */ './views/single/playlist');

// component for search
const search = () => import(/* webpackChunkName: "search" */ './views/search');

// component for general settings
const settings = () => import(/* webpackChunkName: "search" */ './views/settings');

// callback route after auth with spotify
const callback = () => import(/* webpackChunkName: "search" */ './views/callback');

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
    },
    component: artistRelated,
  },
  {
    path: 'about',
    name: 'artistAbout',
    meta: {
      buttons: true,
    },
    component: artistAbout,
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
  path: '/settings',
  name: 'settings',
  meta: {
    compact: true,
  },
  component: settings,
},
{
  path: '/callback',
  name: 'callback',
  component: callback,
},
];
