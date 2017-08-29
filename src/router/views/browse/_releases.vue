<template lang="pug">
.page-container
	// new releases
	ma-section(:title='$t("newreleases")')

		.section-items-container
			ma-item(
        v-for='album in releases.albums.items',
        :key='album.id',
        :type='album.type',
        :primaryid='album.id',
        :image='album.images[0].url',
        :title='album.name')
</template>

<script>
export default {
  data() {
    return {
      releases: [],
    };
  },
  created() {
    // fetch the data when the view is created and the data is
    // already being observed
    this.getNewReleases();
  },
  methods: {

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
      }).catch(() => {
        that.$store.commit('ADD_NOTICE', that.$t('errors.fetchfeaturedplaylists'));
      });
    },
  },
};
</script>
