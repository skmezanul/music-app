<template lang="pug">
main.main-container
	// stage
	ma-stage(
    :subtitle='$tc("album", 1)',
    :image='data.album.images[0].url',
    :title='data.album.name',
    :meta='`${$t("by")} ${data.album.artists[0].name}`')

	.page-container
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
import { mapGetters } from 'vuex';

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
    this.$startLoading('fetching data');
    this.fetchData();
  },
  methods: {
    fetchData() {
      const that = this;

      that.axios.all([
          that.getSingleAlbum(),
        ])
        .then((res) => {
          that.data.album = res[0].data;
          that.$endLoading('fetching data');
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
