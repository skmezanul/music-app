<template>
<main class="main-container">

  <!-- stage -->
  <stage
  :type="playlist.type"
  :image="playlist.images[0].url"
  :title="playlist.name"
  :meta="playlist.description"
  ></stage>

  <div class="page-container">

    <pagesection>
      <ol class="flex-table">
        <flextable
        v-for="(playlist, index) in playlist.tracks.items"
        :key="playlist.track.id"
        :type="playlist.track.type"
        :image="playlist.track.album.images[0].url"
        :title="playlist.track.name"
        :artists="playlist.track.artists"
        :album="playlist.track.album"
        :duration="playlist.track.duration_ms"
        :index="index"
        ></flextable>
      </ol>
    </pagesection>

  </div>

</main>
</template>
<script>
export default {
  data() {
    return {
      playlist: [],
    };
  },
  created() {
    // fetch the data when the view is created and the data is
    // already being observed
    this.getSinglePlaylist();
  },
  methods: {
    getSinglePlaylist() {
      this.$startLoading('fetching data');
      // get playlist from the api
      this.axios({
        method: 'get',
        url: `/users/${this.$route.params.user}/playlists/${this.$route.params.id}`,
        params: {
          market: this.$store.state.currentUser.country,
        },
      }).then((res) => {
        this.playlist = res.data;
        this.$endLoading('fetching data');
      }).catch((err) => {
        this.playlist = [];
        this.$router.go(-1);
        this.$endLoading('fetching data');
        this.$store.commit('ADD_NOTICE', `Playlist could not be fetched, please try again later. ${err}`);
      });
    },
  },
};
</script>
