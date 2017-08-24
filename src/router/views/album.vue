<template lang="pug">
main.main-container
	// stage
	ma-stage(:subtitle='$tc("album", 1)', :image='album.images[0].url', :title='album.name', :meta='`${$t("by")} ${album.artists[0].name}`')

	.page-container
		// tracks
		ma-section
			ol.list
				ma-list(v-for='(track, index) in album.tracks.items', :key='track.id', :type='track.type', :title='track.name', :primaryid='track.id', :duration='track.duration_ms', :index='index')
</template>

<script>
export default {
  data() {
    return {
      album: [],
    };
  },
  created() {
    // fetch the data when the view is created and the data is
    // already being observed
    this.getSingleAlbum();
  },
  methods: {
    // get album from the api
    getSingleAlbum() {
      this.$startLoading('fetching data');
      this.axios({
        method: 'get',
        url: `/albums/${this.$route.params.id}`,
        params: {
          market: this.$store.state.currentUser.country,
        },
      }).then((res) => {
        this.album = res.data;
        this.$endLoading('fetching data');
      }).catch(() => {
        this.$router.go(-1);
        this.$endLoading('fetching data');
        this.$store.commit('ADD_NOTICE', this.$t('errors.fetchalbum'));
      });
    },
  },
};
</script>
