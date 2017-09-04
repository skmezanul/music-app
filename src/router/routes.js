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
const settings = () => import(/* webpackChunkName: "settings" */ './views/settings');

export default [{
  path: '/browse',
  component: browseIndex,
  children: [{
    path: '',
    name: 'browse',
    meta: {
      title: 'Browse',
      compact: true,
    },
    component: browseOverview,
  },
  {
    path: 'charts',
    name: 'browseCharts',
    meta: {
      title: 'Charts',
      compact: true,
    },
    component: browseCharts,
  },
  {
    path: 'categories',
    name: 'browseCategories',
    meta: {
      title: 'Categories',
      compact: true,
    },
    component: browseCategories,
  },
  {
    path: 'releases',
    name: 'browseReleases',
    meta: {
      title: 'New Releases',
      compact: true,
    },
    component: browseReleases,
  },
  {
    path: 'discover',
    name: 'browseDiscover',
    meta: {
      title: 'Discover',
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
      title: 'Artist',
      buttons: true,
    },
    component: artistOverview,
  },
  {
    path: 'related',
    name: 'artistRelated',
    meta: {
      title: 'Related Artists',
      buttons: true,
    },
    component: artistRelated,
  },
  {
    path: 'about',
    name: 'artistAbout',
    meta: {
      title: 'About',
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
    title: 'Album',
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
    title: 'Playlist',
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
    title: 'Search',
    compact: true,
  },
  component: search,
},
{
  path: '/history',
  name: 'mylibraryHistory',
  meta: {
    title: 'Recently Played',
    buttons: true,
  },
  component: mylibraryHistory,
},
{
  path: '/tracks',
  name: 'mylibraryTracks',
  meta: {
    title: 'Tracks',
    buttons: true,
  },
  component: mylibraryTracks,
},
{
  path: '/settings',
  name: 'settings',
  meta: {
    title: 'Settings',
    compact: true,
  },
  component: settings,
},
];
