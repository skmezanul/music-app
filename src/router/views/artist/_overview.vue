<template lang="pug">
.page-container
	// top tracks
	ma-section(v-if='toptracks.length > 0', :title='$t("toptracks")', :collapsible='true')
		ol.list
			ma-list(v-for='(track, index) in toptracks', :key='track.id', :primaryid='track.id', :type='track.type', :image='track.album.images[0].url', :title='track.name', :duration='track.duration_ms', :index='index')

	// albums
	ma-section(v-if='albums.length > 0', :title='$tc("album", 0)', :collapsible='true')
		.section-items-container
			ma-item(v-for='album in albums', :key='album.id', :type='album.type', :primaryid='album.id', :secondaryid='album.artists[0].id', :image='album.images[0].url', :title='album.name', :artist='album.artists')

	// singles
	ma-section(v-if='singles.length > 0', :title='$tc("single", 0)', :collapsible='true')
		.section-items-container
			ma-item(v-for='single in singles', :key='single.id', :type='single.type', :primaryid='single.id', :secondaryid='single.artists[0].id', :image='single.images[0].url', :title='single.name', :artist='single.artists')

	// appears on
	ma-section(v-if='appearson.length > 0', :title='$t("appearson")', :collapsible='true')
		.section-items-container
			ma-item(v-for='album in appearson', :key='album.id', :type='album.type', :primaryid='album.id', :secondaryid='album.artists[0].id', :image='album.images[0].url', :title='album.name', :artist='album.artists')
</template>

<script>
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
      this.axios({
        method: 'get',
        url: `/artists/${this.$route.params.id}/top-tracks`,
        params: {
          country: this.$store.state.currentUser.country,
        },
      }).then((res) => {
        this.toptracks = res.data.tracks;
      }).catch((err) => {
        this.$router.go(-1);
        this.$store.commit(
          'ADD_NOTICE',
          `This artists top tracks could not be fetched, please try again later. ${err}`
        );
      });
    },

    // Get this artist's albums from the api
    getAlbums() {
      this.axios({
        method: 'get',
        url: `/artists/${this.$route.params.id}/albums`,
        params: {
          market: this.$store.state.currentUser.country,
          album_type: 'album',
        },
      }).then((res) => {
        this.albums = res.data.items;
      }).catch((err) => {
        this.$router.go(-1);
        this.$store.commit(
          'ADD_NOTICE',
          `Albums could not be fetched, please try again later. ${err}`
        );
      });
    },

    // Get this artist's singles from the api
    getSingles() {
      this.axios({
        method: 'get',
        url: `/artists/${this.$route.params.id}/albums`,
        params: {
          market: this.$store.state.currentUser.country,
          album_type: 'single',
        },
      }).then((res) => {
        this.singles = res.data.items;
      }).catch((err) => {
        this.$store.commit(
          'ADD_NOTICE',
          `Singles could not be fetched, please try again later. ${err}`
        );
        this.$router.go(-1);
        this.$store.commit(
          'ADD_NOTICE',
          `Singles could not be fetched, please try again later. ${err}`
        );
      });
    },

    // Get album's this artist appears on from the api
    getAppearsOn() {
      this.axios({
        method: 'get',
        url: `/artists/${this.$route.params.id}/albums`,
        params: {
          market: this.$store.state.currentUser.country,
          album_type: 'appears_on',
        },
      }).then((res) => {
        this.appearson = res.data.items;
      }).catch((err) => {
        this.$router.go(-1);
        this.$store.commit(
          'ADD_NOTICE',
          `Albums this artist appears on could not be fetched, please try again later. ${err}`
        );
      });
    },
  },
};
</script>
