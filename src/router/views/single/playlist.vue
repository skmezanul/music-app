<template lang="pug">
main.main-container
	// stage
	ma-stage(
    :subtitle='$tc("playlist", 1)',
    :image='playlist.images[0].url',
    :title='playlist.name',
    :meta='playlist.description')

	.page-container
		// tracks
		ma-section

			ol.list
				ma-list(
          v-for='(playlist, index) in playlist.tracks.items',
          :key='playlist.track.id',
          :trackid='playlist.track.id',
          :type='playlist.track.type',
          :image='playlist.track.album.images[0].url',
          :title='playlist.track.name',
          :artists='playlist.track.artists',
          :album='playlist.track.album',
          :explicit='playlist.track.explicit',
          :duration='playlist.track.duration_ms',
          :index='index')
</template>

<script>
export default {
  data() {
    return {
      playlist: [],
    };
  },
  created() {
    // fetch the data when the view is created and the data is
    // already being observed
    this.getSinglePlaylist();
  },
  methods: {
    // get playlist from the api
    getSinglePlaylist() {
      const that = this;
      const market = that.$store.getters.getMarket;

      that.$startLoading('fetching data');
      that.axios({
        method: 'get',
        url: `/users/${that.$route.params.owner}/playlists/${that.$route.params.id}`,
        params: {
          market,
        },
      }).then((res) => {
        that.playlist = res.data;
        that.$endLoading('fetching data');
      });
    },
  },
};
</script>
