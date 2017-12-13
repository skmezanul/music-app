<template lang='pug'>
.view-parent
	// stage
	ma-stage(v-show='!$isLoading("data")')

	.view-content(v-if='!$isLoading("data")')
		// tracks
		ma-section(
      v-if='data.results.tracks.items',
      :title='`${$tc("track", 0)} (${data.results.tracks.items.length})`',
      :collapsible='true')

			ol.list
				ma-list(
          v-for='(track, index) in data.results.tracks.items',
          :key='index',
          :trackId='track.id',
          :type='track.type',
          :image='track.album.images',
          :title='track.name',
          :artists='track.artists',
          :album='track.album',
          :explicit='track.explicit',
          :popularity='track.popularity',
          :duration='track.duration_ms',
          :index='index')

		// albums
		ma-section(
      v-if='data.results.albums.items',
      :title='`${$tc("album", 0)} (${data.results.albums.items.length})`',
      :collapsible='true')

			.section-items-container
				ma-item(
          v-for='(album, index) in data.results.albums.items',
          :key='index',
          :type='album.type',
          :primaryid='album.id',
          :secondaryid='album.artists[0].id',
          :image='album.images',
          :title='album.name',
          :artists='album.artists')

		// artists
		ma-section(
      v-if='data.results.artists.items',
      :title='`${$tc("artist", 0)} (${data.results.artists.items.length})`',
      :collapsible='true')

			.section-items-container
				ma-item(
          v-for='(artist, index) in data.results.artists.items',
          :key='index',
          :type='artist.type',
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
      const self = this;
      self.$startLoading('data');

      self.axios.all([
        self.getResults(),
      ]).then((res) => {
        const results = res[0].data,
          stageImage = results.tracks.items[0].album.images[0].url;

        self.data.results = results;
        // init stage
        self.setStage({
          subtitle: self.$tc('search', 1),
          title: `${self.$t('resultsfor')} '${self.$route.params.query}'`,
          image: stageImage,
        });
        self.$endLoading('data');
      });
    },

    // get search results from the api
    getResults() {
      const self = this,
        { market } = self,
        q = self.$route.params.query;

      return self.$spotifyApi({
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
