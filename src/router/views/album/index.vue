<template>
<main class="main-container">

  <!-- stage -->
  <ma-stage
  :type="album.type"
  :image="album.images[0].url"
  :title="album.name"
  :meta="`By ${album.artists[0].name}`"
  ></ma-stage>

  <div class="page-container">

    <ma-section>
      <ol class="flex-table">
        <ma-list
        v-for="(track, index) in album.tracks.items"
        :key="track.id"
        :type="track.type"
        :title="track.name"
        :primaryID="track.id"
        :duration="track.duration_ms"
        :index="index"
        ></ma-list>
      </ol>
    </ma-section>

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
      }).catch((err) => {
        this.album = [];
        this.$router.go(-1);
        this.$endLoading('fetching data');
        this.$store.commit('ADD_NOTICE', `Album could not be fetched, please try again later. ${err}`);
      });
    },
  },
};
</script>
