<template>
<main class="main-container">

  <!-- stage -->
  <stage
  :type="album.type"
  :image="album.images[0].url"
  :title="album.name"
  :primaryInfo="`By ${album.artists[0].name}`"
  :secondaryInfo="`Released ${album.release_date}`"
  ></stage>

  <div class="page-container">

    <section class="page-section tracks">
      <ol class="flex-table">
        <flextable
        v-for="(track, index) in album.tracks.items"
        :key="track.id"
        :type="track.type"
        :title="track.name"
        :primaryID="track.id"
        :duration="track.duration_ms"
        :index="index"
        ></flextable>
      </ol>
    </section>

  </div>

</main>
</template>
<script>
export default {
  data() {
    return {
      album: [],
    };
  },
  created() {
    // fetch the data when the view is created and the data is
    // already being observed
    this.getSingleAlbum();
  },
  methods: {
    // get album from the api
    getSingleAlbum() {
      this.$startLoading('fetching data');
      this.axios({
        method: 'get',
        url: `/albums/${this.$route.params.id}`,
        params: {
          market: this.$store.state.currentUser.country,
        },
      }).then((res) => {
        this.album = res.data;
        this.$endLoading('fetching data');
      }).catch(() => {
        this.$store.commit('ADD_NOTICE', 'Album could not be fetched, please try again later.');
        this.album = [];
        this.$router.go(-1);
        this.$endLoading('fetching data');
      });
    },
  },
};
</script>
