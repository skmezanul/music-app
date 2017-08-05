// Components for "browse"
const browseIndex = require('./views/browse/index.vue');
const browseOverview = require('./views/browse/_overview.vue');
const browseCharts = require('./views/browse/_charts.vue');

// Components for "artist"
const artistIndex = require('./views/artist/index.vue');
const artistOverview = require('./views/artist/_overview.vue');
const artistConcerts = require('./views/artist/_concerts.vue');
const artistSimilar = require('./views/artist/_similar.vue');
const artistInformation = require('./views/artist/_information.vue');

// Components for "mymusic"
const mymusicLastheard = require('./views/mymusic/lastheard.vue');

// Component for single album
const albumIndex = require('./views/album/index.vue');

// Component for single playlist
const playlistIndex = require('./views/playlist/index.vue');

export default [{
  path: '/browse',
  component: browseIndex,
  children: [{
    path: '',
    name: 'Overview2',
    meta: {
      stage: 'full',
    },
    component: browseOverview,
  },
  {
    path: 'charts',
    name: 'charts',
    meta: {
      stage: 'compact',
    },
    component: browseCharts,
  },
  ],
},
{
  path: '/artist/:id',
  component: artistIndex,
  children: [{
    path: '',
    name: 'overview',
    meta: {
      stage: 'full',
    },
    component: artistOverview,
  },
  {
    path: 'concerts',
    name: 'concerts',
    meta: {
      stage: 'compact',
    },
    component: artistConcerts,
  },
  {
    path: 'similar',
    name: 'similar',
    meta: {
      stage: 'compact',
    },
    component: artistSimilar,
  },
  {
    path: 'information',
    name: 'information',
    meta: {
      stage: 'compact',
    },
    component: artistInformation,
  },
  ],
},
{
  path: '/album/:id',
  component: albumIndex,
  meta: {
    stage: 'compact',
  },
},
{
  path: '/playlist/:user/:id',
  component: playlistIndex,
  meta: {
    stage: 'compact',
  },
},
{
  path: '/lastheard',
  component: mymusicLastheard,
  meta: {
    stage: 'full',
  },
},
];
