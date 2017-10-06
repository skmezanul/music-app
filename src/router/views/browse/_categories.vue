<template lang="pug">
.page-container
	// categories
	ma-section(:title='$tc("category", 0)')

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
import { mapGetters } from 'vuex';

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
  methods: {
    // get categories from the api
    getCategories() {
      const that = this;
      const locale = that.locale;

      that.$startLoading('fetching data');
      that.axios({
        method: 'get',
        url: '/browse/categories',
        params: {
          limit: 50,
          locale,
        },
      }).then((res) => {
        that.categories = res.data.categories;
        that.$endLoading('fetching data');
      });
    },
  },
  computed: {
    ...mapGetters({
      locale: 'getLocale',
    }),
  },
};
</script>
