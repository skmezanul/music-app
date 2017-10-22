<template lang="pug">
main.main-container
	// stage
	ma-stage(
    :subtitle='$tc("artist", 1)',
    :navigation='navigation',
    :image='data.artistInfo.images[0].url',
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
    this.$startLoading('fetching data');
    this.getArtistInfo();
    this.getAdditionalInfo();
    this.getTopTracks();
    this.getAlbums();
    this.getSingles();
    this.getAppearsOn();
    this.getRelatedArtists();
  },
  methods: {
    // get artist info from the api
    getArtistInfo() {
      const that = this;

      that.$spotifyApi({
        method: 'get',
        url: `/artists/${that.$route.params.id}`,
      }).then((res) => {
        that.data.artistInfo = res.data;
        that.$endLoading('fetching data');
      });
    },

    // get additional artist info
    getAdditionalInfo() {
      const that = this;

      that.$spotifyBackendApi({
        method: 'get',
        url: `/artists/${that.$route.params.id}`,
      }).then((res) => {
        that.data.additionalInfo = res.data;
      });
    },

    // Get this artist's top tracks from the api
    getTopTracks() {
      const that = this;
      const country = that.country;

      that.$spotifyApi({
        method: 'get',
        url: `/artists/${that.$route.params.id}/top-tracks`,
        params: {
          country,
        },
      }).then((res) => {
        that.data.toptracks = res.data.tracks;
      });
    },

    // Get this artist's albums from the api
    getAlbums() {
      const that = this;
      const market = that.market;

      that.$spotifyApi({
        method: 'get',
        url: `/artists/${that.$route.params.id}/albums`,
        params: {
          market,
          album_type: 'album',
        },
      }).then((res) => {
        that.data.albums = res.data.items;
      });
    },

    // Get this artist's singles from the api
    getSingles() {
      const that = this;
      const market = that.market;

      that.$spotifyApi({
        method: 'get',
        url: `/artists/${that.$route.params.id}/albums`,
        params: {
          market,
          album_type: 'single',
        },
      }).then((res) => {
        that.data.singles = res.data.items;
      });
    },

    // Get album's this artist appears on from the api
    getAppearsOn() {
      const that = this;
      const market = that.market;

      that.$spotifyApi({
        method: 'get',
        url: `/artists/${that.$route.params.id}/albums`,
        params: {
          market,
          album_type: 'appears_on',
        },
      }).then((res) => {
        that.data.appearson = res.data.items;
      });
    },

    // get artists related to this artist from the api
    getRelatedArtists() {
      const that = this;

      that.$spotifyApi({
        method: 'get',
        url: `/artists/${that.$route.params.id}/related-artists`,
      }).then((res) => {
        that.data.related = res.data.artists;
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
