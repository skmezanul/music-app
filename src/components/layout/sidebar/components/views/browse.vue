<template lang='pug'>
.view-parent
  maPanelList(:items='items', @close-panel='$emit("close-panel")')
</template>

<script>
import { mapGetters } from 'vuex';

import maPanelList from '../panelList';

export default {

  data: () => ({
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
  }),

  created() {
    this.fetchData();
  },

  watch: {
    'currentPlayback.item': function watchPlayback() {
      this.fetchData();
    },
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
        const featuredMessage = res[0].data.message,
          lastPlayedArtist = res[1].data.items[0].track.artists[0].name,
          trackCount = res[2].data.items.length,
          albumCount = res[3].data.items.length;

        // featured message
        self.items[0].meta = featuredMessage;
        // last played artist
        self.items[1].meta = lastPlayedArtist;
        // library track count
        self.items[2].meta = `${trackCount} ${self.$tc('track', trackCount === 1 ? 1 : 0)}`;
        // library album count
        self.items[3].meta = `${albumCount} ${self.$tc('album', albumCount === 1 ? 1 : 0)}`;
      });
    },

    // get get current featured message from the api
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
      country: 'user/getCountry',
      currentPlayback: 'playback/getCurrentPlayback',
    }),
  },

  components: {
    maPanelList,
  },

};
</script>
