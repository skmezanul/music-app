<template lang="pug">
.page-container
  // featured playlists
  ma-section(
    :title='featured.message',
    :collapsible='true')

    .section-items-container
      ma-item(
        v-for='playlist in featured.playlists.items',
        :key='playlist.id',
        :type='playlist.type',
        :primaryid='playlist.id',
        :secondaryid='playlist.owner.id',
        :image='playlist.images[0].url',
        :title='playlist.name')

  // new releases
  ma-section(:title='$t("newreleases")', :collapsible='true')

    .section-items-container
      ma-item(
        v-for='album in releases.albums.items',
        :key='album.id',
        :type='album.type',
        :primaryid='album.id',
        :image='album.images[0].url',
        :title='album.name',
        :artist='album.artists')


  // categories
  ma-section(:title='$tc("category", 0)', :collapsible='true')

    .section-items-container
      ma-item(
        v-for='category in categories.items',
        type="category",
        :key='category.id',
        :primaryid='category.id',
        :image='category.icons[0].url',
        :title='category.name')
</template>

<script>
export default {
  data() {
    return {
      featured: [],
      releases: [],
      categories: [],
    };
  },
  created() {
    // fetch the data when the view is created and the data is
    // already being observed
    this.getFeaturedPlaylists();
    this.getNewReleases();
    this.getCategories();
  },
  methods: {
    // get featured playlists from the api
    getFeaturedPlaylists() {
      const that = this;
      const country = that.$store.getters.getCountry;

      that.$startLoading('fetching data');
      that.axios({
        method: 'get',
        url: '/browse/featured-playlists',
        params: {
          country,
        },
      }).then((res) => {
        that.featured = res.data;
        that.$endLoading('fetching data');
      });
    },

    // get new releases from the api
    getNewReleases() {
      const that = this;
      const country = that.$store.getters.getCountry;

      that.$startLoading('fetching data');
      that.axios({
        method: 'get',
        url: '/browse/new-releases',
        params: {
          country,
        },
      }).then((res) => {
        that.releases = res.data;
        that.$endLoading('fetching data');
      });
    },

    // get categories from the api
    getCategories() {
      const that = this;
      const locale = that.$store.getters.getLocale;

      that.$startLoading('fetching data');
      that.axios({
        method: 'get',
        url: '/browse/categories',
        params: {
          limit: 15,
          locale,
        },
      }).then((res) => {
        that.categories = res.data.categories;
        that.$endLoading('fetching data');
      });
    },
  },
};
</script>
