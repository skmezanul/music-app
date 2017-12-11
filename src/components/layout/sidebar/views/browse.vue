<template lang='pug'>
.view-parent
  maPanelList(:items='items', @close-panel='$emit("close-panel")')
</template>

<script>
import {
  mapGetters,
} from 'vuex';

import maPanelList from '../components/panelList';

export default {
  data() {
    return {
      items: [{
        name: 'browse',
        routeName: 'browse',
        meta: '...',
      },
      {
        name: 'recentlyplayed',
        routeName: 'mylibraryHistory',
        meta: '...',
      },
      {
        name: 'track',
        routeName: 'mylibraryTracks',
        meta: '...',
      },
      {
        name: 'album',
        routeName: 'mylibraryAlbums',
        meta: '...',
      },
      ],
    };
  },
  created() {
    this.fetchData();
  },
  watch: {
    'currentPlayback.item': 'fetchData',
  },
  methods: {
    fetchData() {
      const self = this;

      self.axios.all([
        self.getFeaturedMessage(),
        self.getLastHeardArtist(),
        self.getLibraryTrackCount(),
        self.getLibraryAlbumCount(),
      ]).then((res) => {
        self.items[0].meta = res[0].data.message;
        self.items[1].meta = res[1].data.items[0].track.artists[0].name;
        self.items[2].meta = `${res[2].data.items.length} ${self.$tc('track', 0)}`;
        self.items[3].meta = `${res[3].data.items.length} ${self.$tc('album', 0)}`;
      });
    },

    // get get currnt featured message from the api
    getFeaturedMessage() {
      const self = this,
        { country } = self;

      return self.$spotifyApi({
        method: 'get',
        url: '/browse/featured-playlists',
        params: {
          country,
        },
      });
    },

    // get get this user's last heard track from the api
    getLastHeardArtist() {
      const self = this;

      return self.$spotifyApi({
        method: 'get',
        url: '/me/player/recently-played',
        params: {
          type: 'track',
        },
      });
    },

    // get get this user's track count
    getLibraryTrackCount() {
      const self = this;

      return self.$spotifyApi({
        method: 'get',
        url: '/me/tracks',
      });
    },

    // get get this user's track count
    getLibraryAlbumCount() {
      const self = this;

      return self.$spotifyApi({
        method: 'get',
        url: '/me/albums',
      });
    },
  },
  computed: {
    ...mapGetters({
      country: 'getCountry',
      currentPlayback: 'getCurrentPlayback',
    }),
  },
  components: {
    maPanelList,
  },
};
</script>
