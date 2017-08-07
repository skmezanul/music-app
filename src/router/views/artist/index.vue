<template>
<main class="main-container">

  <!-- stage -->
  <stage
  :type="artist.type"
  :navigation="navigation"
  :image="artist.images[0].url"
  :title="artist.name"
  ></stage>

  <!-- router view -->
  <router-view></router-view>

</main>
</template>

<script>
export default {
  data() {
    return {
      artist: [],
      navigation: [{
        title: 'Overview',
        link: '',
      },
      {
        title: 'Concerts',
        link: 'concerts',
      },
      {
        title: 'Similar Artists',
        link: 'similar',
      },
      {
        title: 'Information',
        link: 'information',
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
      }).catch((err) => {
        this.artist = [];
        this.$router.go(-1);
        this.$endLoading('fetching data');
        this.$store.commit('ADD_NOTICE', `Artist info could not be fetched, please try again later. ${err}`);
      });
    },
  },
};
</script>
