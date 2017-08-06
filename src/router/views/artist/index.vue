<template>
<main class="main-container">

  <!--Stage-->
  <stage
  :type="artist.type"
  :navigation="navigation"
  :image="artist.images[0].url"
  :title="artist.name"
  :primaryInfo="artist.genres[0]"
  :secondaryInfo="`${artist.followers.total} Followers`"
  ></stage>

  <!--Router View-->
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
    this.fetchData();
  },
  watch: {
    // call again the method if the route changes
    $route: 'fetchData',
  },
  methods: {
    fetchData() {
      this.$startLoading('fetching data');
      // get artist information from the api
      this.axios({
        method: 'get',
        url: `/artists/${this.$route.params.id}`,
      }).then((res) => {
        this.artist = res.data;
        this.$endLoading('fetching data');
      }).catch(() => {
        this.$store.commit('notice', 'Artist info could not be fetched, please try again later.');
        this.artist = [];
        this.$router.go(-1);
        this.$endLoading('fetching data');
      });
    },
  },
};
</script>
