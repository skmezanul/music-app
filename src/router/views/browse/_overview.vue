<template lang="pug">
.page-container
	// featured playlists
	ma-section(:title='featured.message', :collapsible='true')
		.section-items-container
			ma-item(v-for='featured in featured.playlists.items', :key='featured.id', :type='featured.type', :primaryid='featured.id', :secondaryid='featured.owner.id', :image='featured.images[0].url', :title='featured.name')
</template>

<script>
export default {
  data() {
    return {
      featured: [],
    };
  },
  created() {
    // fetch the data when the view is created and the data is
    // already being observed
    this.getFeaturedPlaylists();
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
      }).catch((err) => {
        this.$store.commit('ADD_NOTICE', `Featured playlists could not be fetched, please try again later. ${err}`);
        this.featured = [];
      });
    },
  },
};
</script>
