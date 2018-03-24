<template lang='pug'>
.view-parent
	// stage
	ma-stage(v-show='!$isLoading("data")')

	.view-content(v-if='!$isLoading("data")')
		// tracks
		ma-section(:collapsible='false')

			ol.list
				ma-list(
          v-for='(item, index) in data.tracks',
          :key='item.track.id',
          :type='item.track.type',
          :image='item.track.album.images',
          :title='item.track.name',
          :trackId='item.track.id',
          :artists='item.track.artists',
          :album='item.track.album',
          :explicit='item.track.explicit',
          :popularity='item.track.popularity',
          :duration='item.track.duration_ms',
          :index='index')
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {

  data: () => ({
    data: {
      tracks: [],
    },
  }),

  created() {
    // fetch the data when the view is created and the data is
    // already being observed
    this.fetchData();
  },

  methods: {
    ...mapMutations({
      setStage: 'SET_STAGE',
    }),

    fetchData() {
      const self = this;
      self.$startLoading('data');

      self.axios.all([
        self.getSavedTracks(),
      ]).then((res) => {
        const tracks = res[0].data.items,
          trackCount = tracks.length,
          stageImage = tracks[0].track.album.images[0].url;

        self.data.tracks = tracks;
        // init stage
        self.setStage({
          image: stageImage,
          subtitle: self.$t('library'),
          title: self.$tc('track', 0),
          buttons: {
            playall: true,
          },
          info: [{
            value: trackCount,
            subtitle: self.$tc('track', trackCount === 1 ? 1 : 0),
          },
          ],
        });
        self.$endLoading('data');
      });
    },

    // get this user's saved tracks from the api
    getSavedTracks() {
      const self = this,
        { market } = self;

      return self.$spotifyApi({
        method: 'get',
        url: '/me/tracks',
        params: {
          market,
        },
      });
    },
  },

  computed: {
    ...mapGetters({
      market: 'getMarket',
    }),
  },

};
</script>
