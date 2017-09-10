<template lang="pug">
main.main-container
	// stage
	ma-stage(
    :subtitle='$tc("artist", 1)',
    :navigation='navigation',
    :image='artist.images[0].url',
    :title='artist.name')

	// router view
	router-view
</template>

<script>
export default {
  data() {
    return {
      artist: [],
      navigation: [{
          title: this.$t('overview'),
          name: 'artist',
        },
        {
          title: this.$t('relatedartists'),
          name: 'artistRelated',
        },
        {
          title: this.$t('about'),
          name: 'artistAbout',
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
      const that = this;

      that.$startLoading('fetching data');
      that.axios({
        method: 'get',
        url: `/artists/${that.$route.params.id}`,
      }).then((res) => {
        that.artist = res.data;
        that.$endLoading('fetching data');
      });
    },
  },
};
</script>
