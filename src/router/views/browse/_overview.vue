<template lang="pug">
.page-container
	// featured playlists
	ma-section(
    :title='featured.message',
    :collapsible='true')

		.section-items-container
			ma-item(
        v-for='playlist in featured.playlists.items',
        :key='playlist.id',
        :type='playlist.type',
        :primaryid='playlist.id',
        :secondaryid='playlist.owner.id',
        :image='playlist.images[0].url',
        :title='playlist.name')

	// new releases
	ma-section(:title='$t("newreleases")', :collapsible='true')

		.section-items-container
			ma-item(
        v-for='album in releases.albums.items',
        :key='album.id',
        :type='album.type',
        :primaryid='album.id',
        :image='album.images[0].url',
        :title='album.name',
        :artist='album.artists')
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
      const that = this;
      const country = that.$store.state.currentUser.country;

      that.$startLoading('fetching data');
      that.axios({
        method: 'get',
        url: '/browse/featured-playlists',
        params: {
          country,
        },
      }).then((res) => {
        that.featured = res.data;
        that.$endLoading('fetching data');
      });
    },

    // get new releases from the api
    getNewReleases() {
      const that = this;
      const country = that.$store.state.currentUser.country;

      that.$startLoading('fetching data');
      that.axios({
        method: 'get',
        url: '/browse/new-releases',
        params: {
          country,
        },
      }).then((res) => {
        that.releases = res.data;
        that.$endLoading('fetching data');
      });
    },
  },
};
</script>
