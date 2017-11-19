<template lang="pug">
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
          :trackid='item.track.id',
          :artists='item.track.artists',
          :album='item.track.album',
          :explicit='item.track.explicit',
          :duration='item.track.duration_ms',
          :index='index')
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
  data() {
    return {
      data: {
        tracks: [],
      },
    };
  },
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
          self.data.tracks = res[0].data.items;
          // init stage
          self.setStage({
            image: res[0].data.items[0].track.album.images[0].url,
            subtitle: self.$t('library'),
            title: self.$tc('track', 0),
            buttons: {
              playall: true,
            },
          });
          self.$endLoading('data');
        });
    },

    // get this user's saved tracks from the api
    getSavedTracks() {
      const self = this,
            market = self.market;

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
