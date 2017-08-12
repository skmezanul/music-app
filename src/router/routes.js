// Components for "browse"
const browseIndex = require('./views/browse/index.vue').default;
const browseOverview = require('./views/browse/_overview.vue').default;

// Components for "artist"
const artistIndex = require('./views/artist/index.vue').default;
const artistOverview = require('./views/artist/_overview.vue').default;
const artistSimilar = require('./views/artist/_similar.vue').default;
const artistInformation = require('./views/artist/_information.vue').default;

// Components for "mymusic"
const mylibraryHistory = require('./views/mylibrary/history.vue').default;

// Component for single album
const album = require('./views/album.vue').default;

// Component for single playlist
const playlist = require('./views/playlist.vue').default;

// Component for search
const search = require('./views/search.vue').default;

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
    path: 'similar',
    name: 'artistSimilar',
    meta: {
      stage: 'compact',
    },
    component: artistSimilar,
  },
  {
    path: 'information',
    name: 'artistInformation',
    meta: {
      stage: 'compact',
    },
    component: artistInformation,
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
