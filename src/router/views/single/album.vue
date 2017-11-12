<template lang="pug">
.view-parent(v-if='!$isLoading("data")')
	// stage
	ma-stage

	.view-content
		// tracks
		ma-section(:copyright='data.album.copyrights[0].text')

			ol.list
				ma-list(
          v-for='(track, index) in data.album.tracks.items',
          :key='track.id',
          :type='track.type',
          :title='track.name',
          :trackid='track.id',
          :explicit='track.explicit',
          :duration='track.duration_ms',
          :index='index')
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
  data() {
    return {
      data: {
        album: [],
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
          that.getSingleAlbum(),
        ]).then((res) => {
          that.data.album = res[0].data;
          // init stage
          that.setStage({
            image: res[0].data.images[0].url,
            subtitle: that.$tc('album', 1),
            title: res[0].data.name,
            meta: `${that.$t('by')} ${res[0].data.artists[0].name}`,
            buttons: [{
                title: 'playall',
                icon: 'play_circle_filled',
              },
              {
                title: 'save',
                icon: 'save',
              },
            ],
          });
          that.$endLoading('data');
        });
    },

    // get album from the api
    getSingleAlbum() {
      const that = this,
            market = that.market;

      return that.$spotifyApi({
        method: 'get',
        url: `/albums/${that.$route.params.id}`,
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
