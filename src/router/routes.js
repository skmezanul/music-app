export default [{
  path: '/artist',
  component: require('./views/browse/artist.vue'),
  children: [{
      path: '',
      name: 'overview',
      components: {
        default: require('./views/browse/artist/_overview.vue'),
        header: require('./views/browse/artist/header/full.vue'),
        headerbackground: require('./views/browse/artist/header/background/artist.vue'),
      }
    },
    {
      path: 'information',
      name: 'information',
      components: {
        default: require('./views/browse/artist/_information.vue'),
        headerbackground: require('./views/browse/artist/header/background/information.vue'),
      }
    },
    {
      path: 'concerts',
      name: 'concerts',
      components: {
        default: require('./views/browse/artist/_concerts.vue'),
        header: require('./views/browse/artist/header/concerts.vue'),
        headerbackground: require('./views/browse/artist/header/background/concerts.vue'),
      }
    },
    {
      path: 'playlists',
      name: 'playlists',
      meta: {
        compactHeader: true
      },
      components: {
        default: require('./views/browse/artist/_playlists.vue'),
        header: require('./views/browse/artist/header/compact.vue'),
      }
    },
    {
      path: 'feed',
      name: 'feed',
      meta: {
        compactHeader: true
      },
      components: {
        default: require('./views/browse/artist/_feed.vue'),
        header: require('./views/browse/artist/header/compact.vue'),
      }
    },
    {
      path: 'similar',
      name: 'similar',
      meta: {
        compactHeader: true
      },
      components: {
        default: require('./views/browse/artist/_similar.vue'),
        header: require('./views/browse/artist/header/compact.vue'),
      }
    }
  ]
}];
