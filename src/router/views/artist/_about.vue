<template lang="pug">
.page-container
	// about this artist
	ma-section(:title='`About ${$parent.artist.name}`')
		p.biography(v-html='biography')
</template>
<script>
export default {
  data() {
    return {
      biography: null,
    };
  },
  created() {
    // fetch the data when the view is created and the data is
    // already being observed
    this.getBiography();
  },
  methods: {
    // get this artist's biography
    getBiography() {
      this.axios({
        method: 'get',
        baseURL: 'http://ws.audioscrobbler.com/2.0/',
        params: {
          method: 'artist.getInfo',
          api_key: '5ee365767f401c005a08f2ef9a92b66c',
          artist: this.$parent.artist.name,
          limit: 1,
          autocorrect: 1,
          lang: this.$store.state.currentUser.country,
          format: 'json',
        },
      }).then((res) => {
        this.biography = res.data.artist.bio.content;
      }).catch((err) => {
        this.biography = null;
        this.$router.go(-1);
        this.$store.commit('ADD_NOTICE', `Biography could not be fetched, please try again later. ${err}`);
      });
    },
  },
};
</script>
