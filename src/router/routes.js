export default [
  {
    path: '/browse',
    component: require('./views/browse/index.vue'),
    children: [{
        path: '',
        name: 'Overview2',
        meta: {
          stage: 'full'
        },
        component: require('./views/browse/_overview.vue')
      },
      {
        path: 'charts',
        name: 'charts',
        meta: {
          stage: 'compact'
        },
        component: require('./views/browse/_charts.vue')
      },
    ]
  },
  {
    path: '/artist/:id',
    component: require('./views/artist/index.vue'),
    children: [{
        path: '',
        name: 'overview',
        meta: {
          stage: 'full'
        },
        component: require('./views/artist/_overview.vue')
      },
      {
        path: 'concerts',
        name: 'concerts',
        meta: {
          stage: 'compact'
        },
        component: require('./views/artist/_concerts.vue')
      },
      {
        path: 'similar',
        name: 'similar',
        meta: {
          stage: 'compact'
        },
        component: require('./views/artist/_similar.vue'),
      },
      {
        path: 'information',
        name: 'information',
        meta: {
          stage: 'compact'
        },
        component: require('./views/artist/_information.vue'),
      }
    ]
  },
  {
    path: '/album/:id',
    component: require('./views/album/album.vue'),
    meta: {
      stage: 'compact'
    }
  },
  {
    path: '/playlist/:user/:id',
    component: require('./views/playlist/playlist.vue'),
    meta: {
      stage: 'compact'
    }
  },
  {
    path: '/lastheard',
    component: require('./views/mymusic/lastheard.vue'),
    meta: {
      stage: 'compact'
    }
  }
];
