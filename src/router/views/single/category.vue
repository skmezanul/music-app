<template lang="pug">
main.main-container
  // stage
  ma-stage(
    :subtitle='$tc("category", 1)',
    :title='category.name')

  .page-container
    // playlists
    ma-section

      .section-items-container
        ma-item(
          v-for='playlist in playlists',
          :key='playlist.id',
          :type='playlist.type',
          :primaryid='playlist.id',
          :secondaryid='playlist.owner.id',
          :image='playlist.images[0].url',
          :title='playlist.name')
</template>

<script>
export default {
  data() {
    return {
      category: [],
      playlists: [],
    };
  },
  created() {
    // fetch the data when the view is created and the data is
    // already being observed
    this.getCategoryInfo();
    this.getCategoriesPlaylists();
  },
  methods: {
    // get category info from the api
    getCategoryInfo() {
      const that = this;
      const locale = that.$store.state.currentUser.country;
      const country = that.$store.state.currentUser.country;

      that.axios({
        method: 'get',
        url: `/browse/categories/${that.$route.params.id}`,
        params: {
          locale,
          country,
        },
      }).then((res) => {
        that.category = res.data;
      });
    },

    // get categories playlists from the api
    getCategoriesPlaylists() {
      const that = this;
      const locale = that.$store.state.currentUser.country;
      const country = that.$store.state.currentUser.country;

      that.$startLoading('fetching data');
      that.axios({
        method: 'get',
        url: `/browse/categories/${that.$route.params.id}/playlists`,
        params: {
          locale,
          country,
        },
      }).then((res) => {
        that.playlists = res.data.playlists.items;
        that.$endLoading('fetching data');
      });
    },
  },
};
</script>
