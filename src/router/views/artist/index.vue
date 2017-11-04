<template lang="pug">
main.main-container(v-if='!$isLoading("data")')
	// stage
	ma-stage(
	:subtitle='$tc("artist", 1)',
	:navigation='navigation',
	:image='data.additionalInfo.headerImages[1].url',
	:title='data.artistInfo.name')

	// router view
	router-view
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      data: {
        artistInfo: [],
        additionalInfo: [],
        toptracks: [],
        albums: [],
        singles: [],
        appearson: [],
        related: [],
      },
      navigation: [{
          title: this.$t('overview'),
          name: 'artist',
        },
        {
          title: this.$t('relatedartists'),
          name: 'artistRelated',
        },
        {
          title: this.$t('about'),
          name: 'artistAbout',
        },
      ],
    };
  },
  created() {
    // fetch the data when the view is created and the data is
    // already being observedthat.
    this.fetchData();
  },
  methods: {
    fetchData() {
      const that = this;
      that.$startLoading('data');

      that.axios.all([
          that.getArtistInfo(),
          that.getAdditionalInfo(),
          that.getTopTracks(),
          that.getAlbums(),
          that.getSingles(),
          that.getAppearsOn(),
          that.getRelatedArtists(),
        ]).then((res) => {
          that.data.artistInfo = res[0].data;
          that.data.additionalInfo = res[1].data;
          that.data.toptracks = res[2].data.tracks;
          that.data.albums = res[3].data.items;
          that.data.singles = res[4].data.items;
          that.data.appearson = res[5].data.items;
          that.data.related = res[6].data.artists;
          that.$endLoading('data');
        });
    },

    // get artist info from the api
    getArtistInfo() {
      const that = this;

      return that.$spotifyApi({
        method: 'get',
        url: `/artists/${that.$route.params.id}`,
      });
    },

    // get additional artist info
    getAdditionalInfo() {
      const that = this;

      return that.$spotifyBackendApi({
        method: 'get',
        url: `/artists/${that.$route.params.id}`,
      });
    },

    // Get this artist's top tracks from the api
    getTopTracks() {
      const that = this;
      const country = that.country;

      return that.$spotifyApi({
        method: 'get',
        url: `/artists/${that.$route.params.id}/top-tracks`,
        params: {
          country,
        },
      });
    },

    // Get this artist's albums from the api
    getAlbums() {
      const that = this;
      const market = that.market;

      return that.$spotifyApi({
        method: 'get',
        url: `/artists/${that.$route.params.id}/albums`,
        params: {
          market,
          album_type: 'album',
        },
      });
    },

    // Get this artist's singles from the api
    getSingles() {
      const that = this;
      const market = that.market;

      return that.$spotifyApi({
        method: 'get',
        url: `/artists/${that.$route.params.id}/albums`,
        params: {
          market,
          album_type: 'single',
        },
      });
    },

    // Get album's this artist appears on from the api
    getAppearsOn() {
      const that = this;
      const market = that.market;

      return that.$spotifyApi({
        method: 'get',
        url: `/artists/${that.$route.params.id}/albums`,
        params: {
          market,
          album_type: 'appears_on',
        },
      });
    },

    // get artists related to this artist from the api
    getRelatedArtists() {
      const that = this;

      return that.$spotifyApi({
        method: 'get',
        url: `/artists/${that.$route.params.id}/related-artists`,
      });
    },
  },
  computed: {
    ...mapGetters({
      country: 'getCountry',
      market: 'getMarket',
    }),
  },
};
</script>
