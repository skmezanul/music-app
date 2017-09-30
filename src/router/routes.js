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

// component for login
const login = () => import(/* webpackChunkName: "login" */ './views/login');

export default [{
  path: '/login',
  name: 'login',
  meta: {
    title: 'Login',
  },
  component: login,
},
{
  path: '/browse',
  component: browseIndex,
  children: [{
    path: '',
    name: 'browse',
    meta: {
      title: 'Browse',
      compact: true,
      requiresAuth: true,
    },
    component: browseOverview,
  },
  {
    path: 'charts',
    name: 'browseCharts',
    meta: {
      title: 'Charts',
      compact: true,
      requiresAuth: true,
    },
    component: browseCharts,
  },
  {
    path: 'categories',
    name: 'browseCategories',
    meta: {
      title: 'Categories',
      compact: true,
      requiresAuth: true,
    },
    component: browseCategories,
  },
  {
    path: 'releases',
    name: 'browseReleases',
    meta: {
      title: 'New Releases',
      compact: true,
      requiresAuth: true,
    },
    component: browseReleases,
  },
  {
    path: 'discover',
    name: 'browseDiscover',
    meta: {
      title: 'Discover',
      compact: true,
      requiresAuth: true,
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
      requiresAuth: true,
    },
    component: artistOverview,
  },
  {
    path: 'related',
    name: 'artistRelated',
    meta: {
      title: 'Related Artists',
      buttons: true,
      requiresAuth: true,
    },
    component: artistRelated,
  },
  {
    path: 'about',
    name: 'artistAbout',
    meta: {
      title: 'About',
      buttons: true,
      requiresAuth: true,
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
      title: 'User',
      requiresAuth: true,
    },
    component: userOverview,
  },
  {
    path: 'playlists',
    name: 'userPlaylists',
    meta: {
      title: 'Playlists',
      requiresAuth: true,
    },
    component: userPlaylists,
  },
  {
    path: 'following',
    name: 'userFollowing',
    meta: {
      title: 'Following',
      requiresAuth: true,
    },
    component: userFollowing,
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
    requiresAuth: true,
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
    requiresAuth: true,
  },
  component: playlist,
},
{
  path: '/category/:id',
  name: 'category',
  meta: {
    title: 'category',
    compact: true,
    requiresAuth: true,
  },
  component: category,
},
{
  path: '/search/:query',
  name: 'search',
  meta: {
    title: 'Search',
    compact: true,
    requiresAuth: true,
  },
  component: search,
},
{
  path: '/history',
  name: 'mylibraryHistory',
  meta: {
    title: 'Recently Played',
    buttons: true,
    requiresAuth: true,
  },
  component: mylibraryHistory,
},
{
  path: '/tracks',
  name: 'mylibraryTracks',
  meta: {
    title: 'Tracks',
    buttons: true,
    requiresAuth: true,
  },
  component: mylibraryTracks,
},
{
  path: '/albums',
  name: 'mylibraryAlbums',
  meta: {
    title: 'Albums',
    buttons: true,
    compact: true,
    requiresAuth: true,
  },
  component: mylibraryAlbums,
},
{
  path: '/settings',
  name: 'settings',
  meta: {
    title: 'Settings',
    compact: true,
    requiresAuth: true,
  },
  component: settings,
},
];
