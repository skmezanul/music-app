<template>
<main class="main-container">

  <!-- stage -->
  <stage
  type="My Music"
  title="Recently Played"
  :image="history[0].track.album.images[0].url"
  ></stage>

  <div class="page-container">

    <pagesection>
      <ol class="flex-table">
        <flextable
        v-for="(history, index) in history"
        :key="history.track.id"
        :type="history.track.type"
        :image="history.track.album.images[0].url"
        :title="history.track.name"
        :artists="history.track.artists"
        :album="history.track.album"
        :duration="history.track.duration_ms"
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
      history: [],
    };
  },
  created() {
    // fetch the data when the view is created and the data is
    // already being observed
    this.getRecentlyPlayed();
  },
  methods: {
    // get recently played tracks from the api
    getRecentlyPlayed() {
      this.$startLoading('fetching data');
      this.axios({
        method: 'get',
        url: '/me/player/recently-played',
        params: {
          type: 'track',
        },
      }).then((res) => {
        this.history = res.data.items;
        this.$endLoading('fetching data');
      }).catch((err) => {
        this.history = [];
        this.$router.go(-1);
        this.$endLoading('fetching data');
        this.$store.commit('ADD_NOTICE', `Your recently played tracks could not be fetched, please try again later. ${err}`);
      });
    },
  },
};
</script>
