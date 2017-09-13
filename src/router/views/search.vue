<template lang="pug">
main.main-container
	// stage
	ma-stage(
    :subtitle='$tc("search", 1)',
    :image='results.tracks.items[0].album.images[0].url',
    :title="`${$t('resultsfor')} '${$route.params.query}'`")

	.page-container
		// tracks
		ma-section(
      v-if='results.tracks.items.length > 0',
      :title='`${$tc("track", 0)} (${results.tracks.items.length})`',
      :collapsible='true')

			ol.list
				ma-list(
          v-for='(track, index) in results.tracks.items',
          :key='track.id',
          :trackid='track.id',
          :type='track.type',
          :image='track.album.images[0].url',
          :title='track.name',
          :artists='track.artists',
          :album='track.album',
          :explicit='track.explicit',
          :duration='track.duration_ms',
          :index='index')

		// albums
		ma-section(
      v-if='results.albums.items.length > 0',
      :title='`${$tc("album", 0)} (${results.albums.items.length})`',
      :collapsible='true')

			.section-items-container
				ma-item(
          v-for='album in results.albums.items',
          :key='album.id',
          :type='album.type',
          :primaryid='album.id',
          :secondaryid='album.artists[0].id',
          :image='album.images[0].url',
          :title='album.name',
          :artist='album.artists')

		// artists
		ma-section(
      v-if='results.artists.items.length > 0',
      :title='`${$tc("artist", 0)} (${results.artists.items.length})`',
      :collapsible='true')

			.section-items-container
				ma-item(
          v-for='artist in results.artists.items',
          :type='artist.type',
          :key='artist.id',
          :title='artist.name',
          :trackid='artist.id')
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
    // update playing state when playback is changing
    '$route.params.query': 'getResults',
  },
  methods: {
    // get search results from the api
    getResults() {
      const that = this;
      const q = that.$route.params.query;
      that.$startLoading('fetching data');
      that.axios({
        method: 'get',
        url: '/search',
        params: {
          q,
          type: 'album,artist,track',
        },
      }).then((res) => {
        that.results = res.data;
        that.$endLoading('fetching data');
      }).catch(() => {
        that.$router.go(-1);
        that.$endLoading('fetching data');
        that.$store.commit('ADD_NOTICE', that.$t('errors.fetchresults'));
      });
    },
  },
};
</script>
