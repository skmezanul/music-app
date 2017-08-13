<template lang="pug">
main.main-container
	// stage
	ma-stage(type='My Library', title='Recently Played', :image='history[0].track.album.images[0].url')

	.page-container
		// tracks
		ma-section(:collapsible='false')
			ol.flex-table
				ma-list(v-for='(history, index) in history', :key='history.track.id', :type='history.track.type', :image='history.track.album.images[0].url', :title='history.track.name', :artists='history.track.artists', :album='history.track.album', :duration='history.track.duration_ms', :index='index')
</template>

<script>
export default {
  data() {
    return {
      history: [],
    };
  },
  created() {
    // fetch the data when the view is created and the data is
    // already being observed
    this.getRecentlyPlayed();
  },
  watch: {
    // call again if route changes
    $route: 'getRecentlyPlayed',
  },
  methods: {
    // get recently played tracks from the api
    getRecentlyPlayed() {
      this.$startLoading('fetching data');
      this.history = [];
      this.axios({
        method: 'get',
        url: '/me/player/recently-played',
        params: {
          type: 'track',
        },
      }).then((res) => {
        this.history = res.data.items;
        this.$endLoading('fetching data');
      }).catch((err) => {
        this.history = [];
        this.$router.go(-1);
        this.$endLoading('fetching data');
        this.$store.commit('ADD_NOTICE', `Your recently played tracks could not be fetched, please try again later. ${err}`);
      });
    },
  },
};
</script>
