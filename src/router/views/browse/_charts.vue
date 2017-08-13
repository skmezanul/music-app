<template lang="pug">
.page-container
	// charts
	ma-section(title='Charts')
		ol.flex-table
			ma-list(v-for='(playlist, index) in charts', :key='playlist.track.id', :type='playlist.track.type', :image='playlist.track.album.images[0].url', :title='playlist.track.name', :artists='playlist.track.artists', :album='playlist.track.album', :duration='playlist.track.duration_ms', :index='index')
</template>

<script>
export default {
  data() {
    return {
      charts: [],
    };
  },
  created() {
    // fetch the data when the view is created and the data is
    // already being observed
    this.getCharts();
  },
  watch: {
    // call again if route changes
    $route: 'getCharts',
  },
  methods: {
    // get charts from the api
    getCharts() {
      this.$startLoading('fetching data');
      this.charts = [];
      this.axios({
        method: 'get',
        url: '/users/spotifycharts/playlists/37i9dQZEVXbMDoHDwVN2tF',
      }).then((res) => {
        this.charts = res.data.tracks.items;
        this.$endLoading('fetching data');
      }).catch((err) => {
        this.charts = [];
        this.$router.go(-1);
        this.$endLoading('fetching data');
        this.$store.commit('ADD_NOTICE', `Charts could not be fetched, please try again later. ${err}`);
      });
    },
  },
};
</script>
