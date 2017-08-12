<template lang="pug">
main.main-container
	// stage
	ma-stage(type='search', :image='results.albums.items[0].images[0].url', :title="`Results for '${$route.params.query}'`")

	.page-container
		// tracks
		ma-section(v-if='results.tracks.items.length > 0', :title='`Tracks (${results.tracks.items.length})`', :collapsible='true')
			ol.flex-table
				ma-list(v-for='(track, index) in results.tracks.items', :key='track.id', :primaryID='track.id', :type='track.type', :image='track.album.images[0].url', :title='track.name', :duration='track.duration_ms', :index='index')

		// albums
		ma-section(v-if='results.albums.items.length > 0', :title='`Albums (${results.albums.items.length})`', :collapsible='true')
			.section-items-container
				ma-item(v-for='album in results.albums.items', :key='album.id', :type='album.type', :primaryid='album.id', :secondaryid='album.artists[0].id', :image='album.images[0].url', :title='album.name', :artist='album.artists')

		// artists
		ma-section(v-if='results.artists.items.length > 0', :title='`Artists (${results.artists.items.length})`', :collapsible='true')
			.section-items-container
				ma-item(v-for='artist in results.artists.items', :type='artist.type', :key='artist.id', :title='artist.name', :primaryid='artist.id')
</template>

<script>
export default {
  data() {
    return {
      results: [],
    };
  },
  created() {
    // fetch the data when the view is created and the data is
    // already being observed
    this.getResults();
  },
  watch: {
    $route: 'getResults',
  },
  methods: {
    // get search results from the api
    getResults() {
      this.$startLoading('fetching data');
      this.results = [];
      this.axios({
        method: 'get',
        url: '/search',
        params: {
          q: this.$route.params.query,
          type: 'album,artist,track',
        },
      }).then((res) => {
        this.results = res.data;
        this.$endLoading('fetching data');
      }).catch((err) => {
        this.results = [];
        this.$router.go(-1);
        this.$endLoading('fetching data');
        this.$store.commit('ADD_NOTICE', `Playlist could not be fetched, please try again later. ${err}`);
      });
    },
  },
};
</script>
