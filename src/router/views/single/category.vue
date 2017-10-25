<template lang="pug">
main.main-container(v-if='!$isLoading("data")')
	// stage
	ma-stage(
		:subtitle='$tc("category", 1)',
		:title='data.category.name')

	.page-container
		// playlists
		ma-section

			.section-items-container
				ma-item(
					v-for='playlist in data.playlists',
					:key='playlist.id',
					:type='playlist.type',
					:primaryid='playlist.id',
					:secondaryid='playlist.owner.id',
					:image='playlist.images[0].url',
					:title='playlist.name')
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      data: {
        category: [],
        playlists: [],
      },
    };
  },
  created() {
    // fetch the data when the view is created and the data is
    // already being observed
    this.$startLoading('data');
    this.fetchData();
  },
  methods: {
    fetchData() {
      const that = this;

      that.axios.all([
          that.getCategoryInfo(),
          that.getCategoriesPlaylists(),
        ]).then((res) => {
          that.data.category = res[0].data;
          that.data.playlists = res[1].data.playlists.items;
          that.$endLoading('data');
        });
    },

    // get category info from the api
    getCategoryInfo() {
      const that = this,
        locale = that.locale,
        country = that.country;

      return that.$spotifyApi({
        method: 'get',
        url: `/browse/categories/${that.$route.params.id}`,
        params: {
          locale,
          country,
        },
      });
    },

    // get categories playlists from the api
    getCategoriesPlaylists() {
      const that = this,
        locale = that.locale,
        country = that.country;

      return that.$spotifyApi({
        method: 'get',
        url: `/browse/categories/${that.$route.params.id}/playlists`,
        params: {
          locale,
          country,
        },
      });
    },
  },
  computed: {
    ...mapGetters({
      country: 'getCountry',
      locale: 'getLocale',
    }),
  },
};
</script>
