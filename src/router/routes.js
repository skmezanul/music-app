/* eslint-disable one-var, max-len */

// components for "browse"
const browseDir = './views/browse/',
  browse = {
    index: () => import(/* webpackChunkName: "browse" */ `${browseDir}index`),
    overview: () => import(/* webpackChunkName: "browse" */ `${browseDir}_overview`),
    charts: () => import(/* webpackChunkName: "browse" */ `${browseDir}_charts`),
    categories: () => import(/* webpackChunkName: "browse" */ `${browseDir}_categories`),
    releases: () => import(/* webpackChunkName: "browse" */ `${browseDir}_releases`),
    discover: () => import(/* webpackChunkName: "browse" */ `${browseDir}_discover`),
  };

// components for "artist"
const artistDir = './views/artist/',
  artist = {
    index: () => import(/* webpackChunkName: "artist" */ `${artistDir}index`),
    overview: () => import(/* webpackChunkName: "artist" */ `${artistDir}_overview`),
    related: () => import(/* webpackChunkName: "artist" */ `${artistDir}_related`),
    about: () => import(/* webpackChunkName: "artist" */ `${artistDir}_about`),
  };

// components for "user"
const userDir = './views/user/',
  user = {
    index: () => import(/* webpackChunkName: "user" */ `${userDir}index`),
    overview: () => import(/* webpackChunkName: "user" */ `${userDir}_overview`),
    playlists: () => import(/* webpackChunkName: "user" */ `${userDir}_playlists`),
    following: () => import(/* webpackChunkName: "user" */ `${userDir}_following`),
  };

// components for "mylibrary"
const mylibraryDir = './views/mylibrary/',
  mylibrary = {
    history: () => import(/* webpackChunkName: "mylibrary" */ `${mylibraryDir}history`),
    tracks: () => import(/* webpackChunkName: "mylibrary" */ `${mylibraryDir}tracks`),
    albums: () => import(/* webpackChunkName: "mylibrary" */ `${mylibraryDir}albums`),
  };

// components for single views
const singleDir = './views/single/',
  single = {
    album: () => import(/* webpackChunkName: "album" */ `${singleDir}album`),
    playlist: () => import(/* webpackChunkName: "playlist" */ `${singleDir}playlist`),
    category: () => import(/* webpackChunkName: "category" */ `${singleDir}category`),
  };

const otherDir = './views/',
  other = {
    // component for search
    search: () => import(/* webpackChunkName: "search" */ `${otherDir}search`),
    // component for general settings
    settings: () => import(/* webpackChunkName: "settings" */ `${otherDir}settings`),
    // other components
    debug: () => import(/* webpackChunkName: "other" */ `${otherDir}debug`),
    login: () => import(/* webpackChunkName: "other" */ `${otherDir}login`),
  };

export default [{
  path: '',
  redirect: { name: 'browse' },
},
{
  path: '/browse',
  component: browse.index,
  children: [{
    path: '',
    name: 'browse',
    meta: {
      stage: {
        cover: false,
        large: false,
      },
    },
    component: browse.overview,
  },
  {
    path: 'charts',
    name: 'browseCharts',
    meta: {
      stage: {
        cover: false,
        large: false,
      },
    },
    component: browse.charts,
  },
  {
    path: 'categories',
    name: 'browseCategories',
    meta: {
      stage: {
        cover: false,
        large: false,
      },
    },
    component: browse.categories,
  },
  {
    path: 'releases',
    name: 'browseReleases',
    meta: {
      stage: {
        cover: false,
        large: false,
      },
    },
    component: browse.releases,
  },
  {
    path: 'discover',
    name: 'browseDiscover',
    meta: {
      stage: {
        cover: false,
        large: false,
      },
    },
    component: browse.discover,
  },
  ],
},
{
  path: '/artist/:id',
  component: artist.index,
  children: [{
    path: '',
    name: 'artist',
    meta: {
      stage: {
        cover: false,
        large: true,
      },
    },
    component: artist.overview,
  },
  {
    path: 'related',
    name: 'artistRelated',
    meta: {
      stage: {
        cover: false,
        large: false,
      },
    },
    component: artist.related,
  },
  {
    path: 'about',
    name: 'artistAbout',
    meta: {
      stage: {
        cover: false,
        large: false,
      },
    },
    component: artist.about,
  },
  ],
},
{
  path: '/user/:id',
  component: user.index,
  children: [{
    path: '',
    name: 'user',
    meta: {
      stage: {
        large: false,
      },
    },
    component: user.overview,
  },
  {
    path: 'playlists',
    name: 'userPlaylists',
    meta: {
      stage: {
        large: false,
      },
    },
    component: user.playlists,
  },
  {
    path: 'following',
    name: 'userFollowing',
    meta: {
      stage: {
        large: false,
      },
    },
    component: user.following,
  },
  ],
},
{
  path: '/album/:id',
  name: 'album',
  meta: {
    stage: {
      cover: true,
      large: false,
    },
  },
  component: single.album,
},
{
  path: '/playlist/:owner/:id',
  name: 'playlist',
  meta: {
    stage: {
      cover: true,
      large: false,
    },
  },
  component: single.playlist,
},
{
  path: '/category/:id',
  name: 'category',
  meta: {
    stage: {
      cover: false,
      large: false,
    },
  },
  component: single.category,
},
{
  path: '/search/:query',
  name: 'search',
  meta: {
    stage: {
      cover: false,
      large: false,
    },
  },
  component: other.search,
},
{
  path: '/history',
  name: 'mylibraryHistory',
  meta: {
    stage: {
      cover: false,
      large: true,
    },
  },
  component: mylibrary.history,
},
{
  path: '/tracks',
  name: 'mylibraryTracks',
  meta: {
    stage: {
      cover: false,
      large: false,
    },
  },
  component: mylibrary.tracks,
},
{
  path: '/albums',
  name: 'mylibraryAlbums',
  meta: {
    stage: {
      cover: false,
      large: false,
    },
  },
  component: mylibrary.albums,
},
{
  path: '/settings',
  name: 'settings',
  meta: {
    stage: {
      cover: false,
      large: false,
    },
  },
  component: other.settings,
},
{
  path: '/debug',
  name: 'debug',
  meta: {
    stage: {
      cover: false,
      large: false,
    },
  },
  component: other.debug,
},
{
  path: '/login',
  name: 'login',
  component: other.login,
},
];
