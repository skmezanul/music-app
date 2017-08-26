<template lang="pug">
.page-container
	// featured playlists
	ma-section(:title='featured.message', :collapsible='true')
		.section-items-container
			ma-item(v-for='playlist in featured.playlists.items', :key='playlist.id', :type='playlist.type', :primaryid='playlist.id', :secondaryid='playlist.owner.id', :image='playlist.images[0].url', :title='playlist.name')

	// featured playlists
	ma-section(:title='$t("newreleases")', :collapsible='true')
		.section-items-container
			ma-item(v-for='album in releases.albums.items', :key='album.id', :type='album.type', :primaryid='album.id', :image='album.images[0].url', :title='album.name')
</template>

<script>
export default {
  data() {
    return {
      featured: [],
      releases: [],
    };
  },
  created() {
    // fetch the data when the view is created and the data is
    // already being observed
    this.getFeaturedPlaylists();
    this.getNewReleases();
  },
  methods: {
    // get featured playlists from the api
    getFeaturedPlaylists() {
      this.$startLoading('fetching data');
      this.axios({
        method: 'get',
        url: '/browse/featured-playlists',
        params: {
          country: this.$store.state.currentUser.country,
        },
      }).then((res) => {
        this.featured = res.data;
        this.$endLoading('fetching data');
      }).catch(() => {
        this.$store.commit('ADD_NOTICE', this.$t('errors.fetchfeaturedplaylists'));
      });
    },

    // get new releases from the api
    getNewReleases() {
      this.$startLoading('fetching data');
      this.axios({
        method: 'get',
        url: '/browse/new-releases',
        params: {
          country: this.$store.state.currentUser.country,
        },
      }).then((res) => {
        this.releases = res.data;
        this.$endLoading('fetching data');
      }).catch(() => {
        this.$store.commit('ADD_NOTICE', this.$t('errors.fetchfeaturedplaylists'));
      });
    },
  },
};
</script>
