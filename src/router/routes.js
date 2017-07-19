export default [{
    path: '/artist/:id',
    component: require('./views/artist/index.vue'),
    children: [{
        path: '',
        name: 'overview',
        meta: {
          header: 'full'
        },
        component: require('./views/artist/_overview.vue')
      },
      {
        path: 'concerts',
        name: 'concerts',
        meta: {
          header: 'compact'
        },
        component: require('./views/artist/_concerts.vue')
      },
      {
        path: 'playlists',
        name: 'playlists',
        meta: {
          header: 'compact'
        },
        component: require('./views/artist/_playlists.vue')
      },
      {
        path: 'feed',
        name: 'feed',
        meta: {
          header: 'compact'
        },
        component: require('./views/artist/_feed.vue'),
      },
      {
        path: 'similar',
        name: 'similar',
        meta: {
          header: 'compact'
        },
        component: require('./views/artist/_similar.vue'),
      },
      {
        path: 'information',
        name: 'information',
        meta: {
          header: 'full'
        },
        component: require('./views/artist/_information.vue'),
      }
    ]
  },
  {
    path: '/album/:id',
    component: require('./views/album/index.vue'),
    children: [{
      path: '',
      name: 'album',
      meta: {
        header: 'compact'
      },
      component: require('./views/album/_album.vue'),
    }]
  },
  {
    path: '/track/:id',
    component: require('./views/track/index.vue'),
    children: [{
      path: '',
      name: 'track',
      meta: {
        header: 'compact'
      },
      component: require('./views/track/_track.vue'),
    }]
  },
  {
    path: '/playlist/:user/:id',
    component: require('./views/playlist/index.vue'),
    children: [{
      path: '',
      name: 'playlist',
      meta: {
        header: 'compact'
      },
      component: require('./views/playlist/_playlist.vue'),
    }]
  }
];
