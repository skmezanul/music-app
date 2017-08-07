<template>
<div class="page-container">
  <section class="page-section information">
    <div class="section-header">
      <h1>About {{ $parent.artist.name }}</h1>
    </div>
    <p v-show="biography != null" class="biography" v-html="biography">

      <!-- insert biography -->

    </p>
  </section>
</div>
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
          format: 'json',
        },
      }).then((res) => {
        this.biography = res.data.artist.bio.content;
      }).catch(() => {
        this.$store.commit('ADD_NOTICE', 'Biography could not be fetched, please try again later.');
        this.biography = null;
      });
    },
  },
};
</script>
