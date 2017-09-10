<template lang="pug">
.page-container
	// about this artist
	ma-section(:title='`${$t("about")} ${$parent.artist.name}`')
		p.biography(v-html='biography')
</template>

<script>
export default {
  data() {
    return {
      biography: '',
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
      const that = this;
      const artist = that.$parent.artist.name;
      const lang = that.$store.state.currentUser.country;
      const api_key = '5ee365767f401c005a08f2ef9a92b66c';

      that.axios({
        method: 'get',
        baseURL: 'http://ws.audioscrobbler.com/2.0/',
        params: {
          method: 'artist.getInfo',
          api_key,
          artist,
          limit: 1,
          autocorrect: 1,
          lang,
          format: 'json',
        },
      }).then((res) => {
        const bio = res.data.artist.bio.content;
        const formattedBio = bio.split('<a')[0];
        that.biography = formattedBio;
      });
    },
  },
};
</script>
