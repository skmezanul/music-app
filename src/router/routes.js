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
    component: browseOverview,
  },
  {
    path: 'charts',
    name: 'browseCharts',
    component: browseCharts,
  },
  {
    path: 'categories',
    name: 'browseCategories',
    component: browseCategories,
  },
  {
    path: 'releases',
    name: 'browseReleases',
    component: browseReleases,
  },
  {
    path: 'discover',
    name: 'browseDiscover',
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
    component: artistOverview,
  },
  {
    path: 'related',
    name: 'artistRelated',
    component: artistRelated,
  },
  {
    path: 'about',
    name: 'artistAbout',
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
    component: userOverview,
  },
  {
    path: 'playlists',
    name: 'userPlaylists',
    component: userPlaylists,
  },
  {
    path: 'following',
    name: 'userFollowing',
    component: userFollowing,
  },
  ],
},
{
  path: '/album/:id',
  name: 'album',
  component: album,
},
{
  path: '/playlist/:owner/:id',
  name: 'playlist',
  component: playlist,
},
{
  path: '/category/:id',
  name: 'category',
  component: category,
},
{
  path: '/search/:query',
  name: 'search',
  component: search,
},
{
  path: '/history',
  name: 'mylibraryHistory',
  component: mylibraryHistory,
},
{
  path: '/tracks',
  name: 'mylibraryTracks',
  component: mylibraryTracks,
},
{
  path: '/albums',
  name: 'mylibraryAlbums',
  component: mylibraryAlbums,
},
{
  path: '/settings',
  name: 'settings',
  component: settings,
},
{
  path: '/debug',
  name: 'debug',
  component: debug,
},
];
