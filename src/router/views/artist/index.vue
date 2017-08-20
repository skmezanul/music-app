<template lang="pug">
main.main-container
	// stage
	ma-stage(:navigation='navigation', :type='artist.type',:image='artist.images[0].url', :title='artist.name')

	// router view
	keep-alive
		router-view
</template>

<script>
export default {
  data() {
    return {
      artist: [],
      navigation: [{
          title: 'Overview',
          link: '',
        },
        {
          title: 'Related Artists',
          link: 'related',
        },
        {
          title: 'About',
          link: 'about',
        },
      ],
    };
  },
  created() {
    // fetch the data when the view is created and the data is
    // already being observed
    this.getArtist();
  },
  watch: {
    // call again if route changes
    $route: 'getArtist',
  },
  methods: {
    // get artist information from the api
    getArtist() {
      this.$startLoading('fetching data');
      this.artist = [];
      this.axios({
        method: 'get',
        url: `/artists/${this.$route.params.id}`,
      }).then((res) => {
        this.artist = res.data;
        this.$endLoading('fetching data');
      }).catch((err) => {
        this.artist = [];
        this.$router.go(-1);
        this.$endLoading('fetching data');
        this.$store.commit(
          'ADD_NOTICE',
          `Artist info could not be fetched, please try again later. ${err}`
        );
      });
    },
  },
};
</script>
