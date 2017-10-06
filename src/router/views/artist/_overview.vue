<template lang="pug">
.page-container
	// top tracks
	ma-section(
    v-if='toptracks.length > 0',
    :title='$t("toptracks")',
    :collapsible='true')

		ol.list
			ma-list(
        v-for='(track, index) in toptracks',
        :key='track.id',
        :trackid='track.id',
        :type='track.type',
        :image='track.album.images[0].url',
        :explicit='track.explicit',
        :title='track.name',
        :duration='track.duration_ms',
        :index='index')

	// albums
	ma-section(
    v-if='albums.length > 0',
    :title='$tc("album", 0)',
    :collapsible='true')

		.section-items-container
			ma-item(
        v-for='album in albums',
        :key='album.id',
        :type='album.type',
        :primaryid='album.id',
        :secondaryid='album.artists[0].id',
        :image='album.images[0].url',
        :title='album.name',
        :artist='album.artists')

	// singles
	ma-section(
    v-if='singles.length > 0',
    :title='$tc("single", 0)',
    :collapsible='true')

		.section-items-container
			ma-item(
        v-for='single in singles',
        :key='single.id',
        :type='single.type',
        :primaryid='single.id',
        :secondaryid='single.artists[0].id',
        :image='single.images[0].url',
        :title='single.name',
        :artist='single.artists')

	// appears on
	ma-section(
    v-if='appearson.length > 0',
    :title='$t("appearson")',
    :collapsible='true')

		.section-items-container
			ma-item(
        v-for='album in appearson',
        :key='album.id',
        :type='album.type',
        :primaryid='album.id',
        :secondaryid='album.artists[0].id',
        :image='album.images[0].url',
        :title='album.name',
        :artist='album.artists')
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      toptracks: [],
      albums: [],
      singles: [],
      appearson: [],
    };
  },
  created() {
    // fetch the data when the view is created and the data is
    // already being observed
    this.getTopTracks();
    this.getAlbums();
    this.getSingles();
    this.getAppearsOn();
  },
  methods: {
    // Get this artist's top tracks from the api
    getTopTracks() {
      const that = this;
      const country = that.country;

      that.axios({
        method: 'get',
        url: `/artists/${that.$route.params.id}/top-tracks`,
        params: {
          country,
        },
      }).then((res) => {
        that.toptracks = res.data.tracks;
      });
    },

    // Get this artist's albums from the api
    getAlbums() {
      const that = this;
      const market = that.market;

      that.axios({
        method: 'get',
        url: `/artists/${that.$route.params.id}/albums`,
        params: {
          market,
          album_type: 'album',
        },
      }).then((res) => {
        that.albums = res.data.items;
      });
    },

    // Get this artist's singles from the api
    getSingles() {
      const that = this;
      const market = that.market;

      that.axios({
        method: 'get',
        url: `/artists/${that.$route.params.id}/albums`,
        params: {
          market,
          album_type: 'single',
        },
      }).then((res) => {
        that.singles = res.data.items;
      });
    },

    // Get album's this artist appears on from the api
    getAppearsOn() {
      const that = this;
      const market = that.market;

      that.axios({
        method: 'get',
        url: `/artists/${that.$route.params.id}/albums`,
        params: {
          market,
          album_type: 'appears_on',
        },
      }).then((res) => {
        that.appearson = res.data.items;
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
