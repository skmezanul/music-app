// Components for "browse"
const browseIndex = require('./views/browse/index.vue');
const browseOverview = require('./views/browse/_overview.vue');

// Components for "artist"
const artistIndex = require('./views/artist/index.vue');
const artistOverview = require('./views/artist/_overview.vue');
const artistConcerts = require('./views/artist/_concerts.vue');
const artistSimilar = require('./views/artist/_similar.vue');
const artistInformation = require('./views/artist/_information.vue');

// Components for "mymusic"
const mymusicHistory = require('./views/mymusic/history.vue');

// Component for single album
const albumIndex = require('./views/album/index.vue');

// Component for single playlist
const playlistIndex = require('./views/playlist/index.vue');

export default [{
  path: '/browse',
  name: 'browseIndex',
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
    path: 'concerts',
    name: 'artistConcerts',
    meta: {
      stage: 'compact',
    },
    component: artistConcerts,
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
  name: 'albumIndex',
  meta: {
    stage: 'compact',
  },
  component: albumIndex,
},
{
  path: '/playlist/:user/:id',
  name: 'playlistIndex',
  meta: {
    stage: 'compact',
  },
  component: playlistIndex,
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
