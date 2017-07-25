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
          header: 'compact'
        },
        component: require('./views/artist/_information.vue'),
      }
    ]
  },
  {
    path: '/album/:id',
    component: require('./views/album/album.vue'),
    meta: {
      header: 'compact'
    }
  },
  {
    path: '/playlist/:user/:id',
    component: require('./views/playlist/playlist.vue'),
    meta: {
      header: 'compact'
    }
  },
  {
    path: '/lastheard',
    component: require('./views/mymusic/lastheard.vue'),
    meta: {
      header: 'compact'
    }
  }
];
