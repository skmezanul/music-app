// Components for "browse"
const browseIndex = () => import(/* webpackChunkName: "browse" */ './views/browse/index.vue');
const browseOverview = () => import(/* webpackChunkName: "browse" */ './views/browse/_overview.vue');
const browseCharts = () => import(/* webpackChunkName: "browse" */ './views/browse/_charts.vue');
const browseCategories = () => import(/* webpackChunkName: "browse" */ './views/browse/_categories.vue');

// Components for "artist"
const artistIndex = () => import(/* webpackChunkName: "artist" */ './views/artist/index.vue');
const artistOverview = () => import(/* webpackChunkName: "artist" */ './views/artist/_overview.vue');
const artistRelated = () => import(/* webpackChunkName: "artist" */ './views/artist/_related.vue');
const artistAbout = () => import(/* webpackChunkName: "artist" */ './views/artist/_about.vue');

// Components for "mylibrary"
const mylibraryHistory = () => import(/* webpackChunkName: "mylibrary" */ './views/mylibrary/history.vue');

// Component for single album
const album = () => import(/* webpackChunkName: "album" */ './views/album.vue');

// Component for single playlist
const playlist = () => import(/* webpackChunkName: "playlist" */ './views/playlist.vue');

// Component for search
const search = () => import(/* webpackChunkName: "search" */ './views/search.vue');

export default [{
  path: '/browse',
  component: browseIndex,
  children: [{
    path: '',
    name: 'browseOverview',
    meta: {
      stage: 'compact',
    },
    component: browseOverview,
  },
  {
    path: 'charts',
    name: 'browseCharts',
    meta: {
      stage: 'compact',
    },
    component: browseCharts,
  },
  {
    path: 'categories',
    name: 'browseCategories',
    meta: {
      stage: 'compact',
    },
    component: browseCategories,
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
      stage: 'full',
    },
    component: artistOverview,
  },
  {
    path: 'related',
    name: 'artistRelated',
    meta: {
      stage: 'compact',
    },
    component: artistRelated,
  },
  {
    path: 'about',
    name: 'artistAbout',
    meta: {
      stage: 'compact',
    },
    component: artistAbout,
  },
  ],
},
{
  path: '/album/:id',
  name: 'album',
  meta: {
    stage: 'compact',
  },
  component: album,
},
{
  path: '/playlist/:user/:id',
  name: 'playlist',
  meta: {
    stage: 'compact',
  },
  component: playlist,
},
{
  path: '/search/:query',
  name: 'search',
  meta: {
    stage: 'compact',
  },
  component: search,
},
{
  path: '/history',
  name: 'mylibraryHistory',
  meta: {
    stage: 'full',
  },
  component: mylibraryHistory,
},
];
