export default [{
  path: '/artist',
  component: require('./views/browse/artist.vue'),
  children: [{
      path: '',
      name: 'overview',
      meta: {
        overview: true
      },
      components: {
        default: require('./views/browse/artist/_overview.vue'),
        header: require('./views/browse/artist/header/header.vue'),
        headerbackground: require('./views/browse/artist/header/background/artist.vue'),
      }
    },
    {
      path: 'concerts',
      name: 'concerts',
      meta: {
        concerts: true
      },
      components: {
        default: require('./views/browse/artist/_concerts.vue'),
        header: require('./views/browse/artist/header/header.vue'),
        headerbackground: require('./views/browse/artist/header/background/artist.vue'),
      }
    },
    {
      path: 'playlists',
      name: 'playlists',
      meta: {
        compactHeader: true,
        playlists: true
      },
      components: {
        default: require('./views/browse/artist/_playlists.vue'),
        header: require('./views/browse/artist/header/header.vue'),
      }
    },
    {
      path: 'feed',
      name: 'feed',
      meta: {
        compactHeader: true,
        feed: true
      },
      components: {
        default: require('./views/browse/artist/_feed.vue'),
        header: require('./views/browse/artist/header/header.vue'),
      }
    },
    {
      path: 'similar',
      name: 'similar',
      meta: {
        compactHeader: true,
        similar: true
      },
      components: {
        default: require('./views/browse/artist/_similar.vue'),
        header: require('./views/browse/artist/header/header.vue'),
      }
    },
    {
      path: 'information',
      name: 'information',
      meta: {
        information: true
      },
      components: {
        default: require('./views/browse/artist/_information.vue'),
        headerbackground: require('./views/browse/artist/header/background/information.vue'),
      }
    }
  ]
}];
