<template lang="pug">
.page-container
	// categories
	ma-section(title='Categories')
		.section-items-container
			ma-item(v-for='category in categories.items', type="category", :key='category.id', :image='category.icons[0].url', :title='category.name')
</template>

<script>
export default {
  data() {
    return {
      categories: [],
    };
  },
  created() {
    // fetch the data when the view is created and the data is
    // already being observed
    this.getCategories();
  },
  watch: {
    // call again if route changes
    $route: 'getCategories',
  },
  methods: {
    // get categories from the api
    getCategories() {
      this.$startLoading('fetching data');
      this.categories = [];
      this.axios({
        method: 'get',
        url: '/browse/categories',
        params: {
          country: this.$store.state.currentUser.country,
        },
      }).then((res) => {
        this.categories = res.data.categories;
        this.$endLoading('fetching data');
      }).catch((err) => {
        this.categories = [];
        this.$router.go(-1);
        this.$endLoading('fetching data');
        this.$store.commit(
          'ADD_NOTICE',
          `Categories could not be fetched, please try again later. ${err}`
        );
      });
    },
  },
};
</script>
