<template lang="pug">
.view-parent(v-if='!$isLoading("data")')
	// stage
	ma-stage(
    :subtitle='$tc("playlist", 1)',
    :image='data.playlist.images[0].url',
    :title='data.playlist.name',
    :meta='data.playlist.description')

	.view-content
		// tracks
		ma-section

			ol.list
				ma-list(
          v-for='(playlist, index) in data.playlist.tracks.items',
          :key='playlist.track.id',
          :trackid='playlist.track.id',
          :type='playlist.track.type',
          :image='playlist.track.album.images',
          :title='playlist.track.name',
          :artists='playlist.track.artists',
          :album='playlist.track.album',
          :explicit='playlist.track.explicit',
          :duration='playlist.track.duration_ms',
          :index='index')
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      data: {
        playlist: [],
      },
    };
  },
  created() {
    // fetch the data when the view is created and the data is
    // already being observed
    this.fetchData();
  },
  methods: {
    fetchData() {
      const that = this;
      that.$startLoading('data');

      that.axios.all([
          that.getSinglePlaylist(),
        ]).then((res) => {
          that.data.playlist = res[0].data;
          that.$endLoading('data');
        });
    },

    // get playlist from the api
    getSinglePlaylist() {
      const that = this,
            market = that.market;

      return that.$spotifyApi({
        method: 'get',
        url: `/users/${that.$route.params.owner}/playlists/${that.$route.params.id}`,
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
