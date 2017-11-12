<template lang="pug">
.view-parent(v-if='!$isLoading("data")')
	// stage
	ma-stage

	.view-content
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
      const that = this;
      that.$startLoading('data');

      that.axios.all([
          that.getSavedTracks(),
        ]).then((res) => {
          that.data.tracks = res[0].data.items;
          // init stage
          that.setStage({
            image: res[0].data.items[0].track.album.images[0].url,
            subtitle: that.$t('library'),
            title: that.$tc('track', 0),
            buttons: [{
                title: 'playall',
                icon: 'play_circle_filled',
              },
              {
                title: 'edit',
                icon: 'mode_edit',
              },
            ],
          });
          that.$endLoading('data');
        });
    },

    // get this user's saved tracks from the api
    getSavedTracks() {
      const that = this,
            market = that.market;

      return that.$spotifyApi({
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
