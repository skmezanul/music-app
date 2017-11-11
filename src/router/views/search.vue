<template lang="pug">
.view-parent(v-if='!$isLoading("data")')
	// stage
	ma-stage

	.view-content
		// tracks
		ma-section(
      v-if='data.results.tracks.items',
      :title='`${$tc("track", 0)} (${data.results.tracks.items.length})`',
      :collapsible='true')

			ol.list
				ma-list(
          v-for='(track, index) in data.results.tracks.items',
          :key='track.id',
          :trackid='track.id',
          :type='track.type',
          :image='track.album.images',
          :title='track.name',
          :artists='track.artists',
          :album='track.album',
          :explicit='track.explicit',
          :duration='track.duration_ms',
          :index='index')

		// albums
		ma-section(
      v-if='data.results.albums.items',
      :title='`${$tc("album", 0)} (${data.results.albums.items.length})`',
      :collapsible='true')

			.section-items-container
				ma-item(
          v-for='album in data.results.albums.items',
          :key='album.id',
          :type='album.type',
          :primaryid='album.id',
          :secondaryid='album.artists[0].id',
          :image='album.images',
          :title='album.name',
          :artist='album.artists')

		// artists
		ma-section(
      v-if='data.results.artists.items',
      :title='`${$tc("artist", 0)} (${data.results.artists.items.length})`',
      :collapsible='true')

			.section-items-container
				ma-item(
          v-for='artist in data.results.artists.items',
          :type='artist.type',
          :key='artist.id',
          :title='artist.name',
          :image='artist.images',
          :primaryid='artist.id')
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

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
    ...mapMutations({
      setStage: 'SET_STAGE',
    }),

    fetchData() {
      const that = this;
      that.$startLoading('data');

      that.axios.all([
          that.getResults(),
        ]).then((res) => {
          that.data.results = res[0].data;
          // init stage
          that.setStage({
            size: 'compact',
            subtitle: that.$tc('search', 1),
            title: `${that.$t('resultsfor')} '${that.$route.params.query}'`,
            image: res[0].data.tracks.items[0].album.images[0].url,
          });
          that.$endLoading('data');
        });
    },

    // get search results from the api
    getResults() {
      const that = this,
            market = that.market,
            q = that.$route.params.query;

      return that.$spotifyApi({
        method: 'get',
        url: '/search',
        params: {
          type: 'album,artist,track',
          market,
          limit: 12,
          q,
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
