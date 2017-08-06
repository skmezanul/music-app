<template>
<main class="main-container">

  <!--Stage-->
  <stage
  type="My Music"
  title="Recently Played"
  :image="history[0].track.album.images[0].url"
  ></stage>

  <div class="page-container">

    <section class="page-section lastheard">
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
    </section>

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
    this.fetchData();
  },
  watch: {
    // call again the method if the route changes
    $route: 'fetchData',
  },
  methods: {
    fetchData() {
      this.$startLoading('fetching data');
      // get recently played tracks from the api
      this.axios({
        method: 'get',
        url: '/me/player/recently-played',
        params: {
          type: 'track',
        },
      }).then((res) => {
        this.history = res.data.items;
        this.$endLoading('fetching data');
      }).catch(() => {
        this.$store.commit('error', 'Your recently played tracks could not be fetched, please try again later.');
        this.history = [];
        this.$router.go(-1);
        this.$endLoading('fetching data');
      });
    },
  },
};
</script>
