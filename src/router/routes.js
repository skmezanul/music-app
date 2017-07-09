export default [
  {
  path: '/artist',
  component: require('./views/artist/index.vue'),
  children: [{
      path: '',
      name: 'overview',
      meta: {
        header: 'full',
        current: 'overview'
      },
      components: {
        default: require('./views/artist/_overview.vue')
      }
    },
    {
      path: 'concerts',
      name: 'concerts',
      meta: {
        header: 'compact',
        current: 'concerts'
      },
      components: {
        default: require('./views/artist/_concerts.vue')
      }
    },
    {
      path: 'playlists',
      name: 'playlists',
      meta: {
        header: 'compact',
        current: 'playlists'
      },
      components: {
        default: require('./views/artist/_playlists.vue')
      }
    },
    {
      path: 'feed',
      name: 'feed',
      meta: {
        header: 'compact',
        current: 'feed'
      },
      components: {
        default: require('./views/artist/_feed.vue')
      }
    },
    {
      path: 'similar',
      name: 'similar',
      meta: {
        header: 'compact',
        current: 'similar'
      },
      components: {
        default: require('./views/artist/_similar.vue')
      }
    },
    {
      path: 'information',
      name: 'information',
      meta: {
        header: 'full',
        current: 'information'
      },
      components: {
        default: require('./views/artist/_information.vue')
      }
    }
  ]
}
];
