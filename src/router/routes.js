// Components for "browse"
const browseIndex = require('./views/browse/index.vue');
const browseOverview = require('./views/browse/_overview.vue');

// Components for "artist"
const artistIndex = require('./views/artist/index.vue');
const artistOverview = require('./views/artist/_overview.vue');
const artistSimilar = require('./views/artist/_similar.vue');
const artistInformation = require('./views/artist/_information.vue');

// Components for "mymusic"
const mymusicHistory = require('./views/mymusic/history.vue');

// Component for single album
const album = require('./views/album.vue');

// Component for single playlist
const playlist = require('./views/playlist.vue');

// Component for search
const search = require('./views/search.vue');

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
  name: 'mymusicHistory',
  meta: {
    stage: 'full',
  },
  component: mymusicHistory,
},
];
