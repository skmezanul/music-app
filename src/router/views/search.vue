<template lang="pug">
main.main-container(v-if='!$isLoading("data")')
	// stage
	ma-stage(
    :subtitle='$tc("search", 1)',
    :image='data.results.tracks.items[0].album.images[0].url',
    :title="`${$t('resultsfor')} '${$route.params.query}'`")

	.page-container
		// tracks
		ma-section(
      v-if='data.results.tracks.items.length > 0',
      :title='`${$tc("track", 0)} (${data.results.tracks.items.length})`',
      :collapsible='true')

			ol.list
				ma-list(
          v-for='(track, index) in data.results.tracks.items',
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
      v-if='data.results.albums.items.length > 0',
      :title='`${$tc("album", 0)} (${data.results.albums.items.length})`',
      :collapsible='true')

			.section-items-container
				ma-item(
          v-for='album in data.results.albums.items',
          :key='album.id',
          :type='album.type',
          :primaryid='album.id',
          :secondaryid='album.artists[0].id',
          :image='album.images[0].url',
          :title='album.name',
          :artist='album.artists')

		// artists
		ma-section(
      v-if='data.results.artists.items.length > 0',
      :title='`${$tc("artist", 0)} (${data.results.artists.items.length})`',
      :collapsible='true')

			.section-items-container
				ma-item(
          v-for='artist in data.results.artists.items',
          :type='artist.type',
          :key='artist.id',
          :title='artist.name',
          :primaryid='artist.id')
</template>

<script>
export default {
  data() {
    return {
      data: {
        results: [],
      },
    };
  },
  created() {
    // fetch the data when the view is created and the data is
    // already being observed
    this.fetchData();
  },
  watch: {
    // get results when query changes
    '$route.params.query': 'getResults',
  },
  methods: {
    fetchData() {
      const that = this;
      that.$startLoading('data');

      that.axios.all([
          that.getResults(),
        ]).then((res) => {
          that.data.results = res[0].data;
          that.$endLoading('data');
        });
    },

    // get search results from the api
    getResults() {
      const that = this,
            q = that.$route.params.query;

      return that.$spotifyApi({
        method: 'get',
        url: '/search',
        params: {
          type: 'album,artist,track',
          q,
        },
      });
    },
  },
};
</script>
