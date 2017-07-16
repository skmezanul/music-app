export default [
  {
  path: '/artist/:id',
  component: require('./views/artist/index.vue'),
  children: [{
      path: '',
      name: 'overview',
      meta: {
        header: 'full'
      },
      components: {
        default: require('./views/artist/_overview.vue')
      }
    },
    {
      path: 'concerts',
      name: 'concerts',
      meta: {
        header: 'compact'
      },
      components: {
        default: require('./views/artist/_concerts.vue')
      }
    },
    {
      path: 'playlists',
      name: 'playlists',
      meta: {
        header: 'compact'
      },
      components: {
        default: require('./views/artist/_playlists.vue')
      }
    },
    {
      path: 'feed',
      name: 'feed',
      meta: {
        header: 'compact'
      },
      components: {
        default: require('./views/artist/_feed.vue')
      }
    },
    {
      path: 'similar',
      name: 'similar',
      meta: {
        header: 'compact'
      },
      components: {
        default: require('./views/artist/_similar.vue')
      }
    },
    {
      path: 'information',
      name: 'information',
      meta: {
        header: 'full'
      },
      components: {
        default: require('./views/artist/_information.vue')
      }
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
    components: {
      default: require('./views/album/_album.vue')
    }
  }
]
}
];
