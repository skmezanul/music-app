<template lang="pug">
main.main-container
	// stage
	ma-stage(
    :subtitle='$t("library")',
    :title='$tc("track", 0)',
    :image='tracks[0].track.album.images[0].url')

	.page-container
		// tracks
		ma-section(:collapsible='false')

			ol.list
				ma-list(
          v-for='(item, index) in tracks',
          :key='item.track.id',
          :type='item.track.type',
          :image='item.track.album.images[0].url',
          :title='item.track.name',
          :trackid='item.track.id',
          :artists='item.track.artists',
          :album='item.track.album',
          :explicit='item.track.explicit',
          :duration='item.track.duration_ms',
          :index='index')
</template>

<script>
export default {
  data() {
    return {
      tracks: [],
    };
  },
  created() {
    // fetch the data when the view is created and the data is
    // already being observed
    this.getSavedTracks();
  },
  methods: {
    // get this user's saved tracks from the api
    getSavedTracks() {
      const that = this;
      const market = that.$store.state.currentUser.country;

      that.$startLoading('fetching data');
      that.axios({
        method: 'get',
        url: '/me/tracks',
        params: {
          market,
        },
      }).then((res) => {
        that.tracks = res.data.items;
        that.$endLoading('fetching data');
      }).catch(() => {
        that.$router.go(-1);
        that.$endLoading('fetching data');
        that.$store.commit('ADD_NOTICE', that.$t('errors.fetchsavedtracks'));
      });
    },
  },
};
</script>
