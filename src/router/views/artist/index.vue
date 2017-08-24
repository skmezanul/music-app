<template lang="pug">
main.main-container
	// stage
	ma-stage(:subtitle='$tc("artist", 1)', :navigation='navigation', :image='artist.images[0].url', :title='artist.name')

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
          title: this.$t('overview'),
          link: '',
        },
        {
          title: this.$t('relatedartists'),
          link: 'related',
        },
        {
          title: this.$t('about'),
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
  methods: {
    // get artist information from the api
    getArtist() {
      this.$startLoading('fetching data');
      this.axios({
        method: 'get',
        url: `/artists/${this.$route.params.id}`,
      }).then((res) => {
        this.artist = res.data;
        this.$endLoading('fetching data');
      }).catch(() => {
        this.$router.go(-1);
        this.$endLoading('fetching data');
        this.$store.commit('ADD_NOTICE', this.$t('errors.fetchartistinfo'));
      });
    },
  },
};
</script>
