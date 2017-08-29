// Components for "browse"
const browseIndex = () => import(/* webpackChunkName: "browse" */ './views/browse/index');
const browseOverview = () => import(/* webpackChunkName: "browse" */ './views/browse/_overview');
const browseCharts = () => import(/* webpackChunkName: "browse" */ './views/browse/_charts');
const browseCategories = () => import(/* webpackChunkName: "browse" */ './views/browse/_categories');
const browseReleases = () => import(/* webpackChunkName: "browse" */ './views/browse/_releases');

// Components for "artist"
const artistIndex = () => import(/* webpackChunkName: "artist" */ './views/artist/index');
const artistOverview = () => import(/* webpackChunkName: "artist" */ './views/artist/_overview');
const artistRelated = () => import(/* webpackChunkName: "artist" */ './views/artist/_related');
const artistAbout = () => import(/* webpackChunkName: "artist" */ './views/artist/_about');

// Components for "mylibrary"
const mylibraryHistory = () => import(/* webpackChunkName: "mylibrary" */ './views/mylibrary/history');
const mylibraryTracks = () => import(/* webpackChunkName: "mylibrary" */ './views/mylibrary/tracks');

// Component for single album
const album = () => import(/* webpackChunkName: "album" */ './views/album');

// Component for single playlist
const playlist = () => import(/* webpackChunkName: "playlist" */ './views/playlist');

// Component for search
const search = () => import(/* webpackChunkName: "search" */ './views/search');

export default [{
  path: '/browse',
  component: browseIndex,
  children: [{
    path: '',
    name: 'browseOverview',
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
  ],
},
{
  path: '/artist/:id',
  component: artistIndex,
  children: [{
    path: '',
    name: 'artistOverview',
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
];
