<template lang='pug'>
.view-parent
	// stage
	ma-stage(v-show='!$isLoading("data")')

	.view-content(v-if='!$isLoading("data")')
		// categories
		ma-section

			.section-items-container
				ma-item(
					v-for='(playlist, index) in data.playlists',
					:key='index',
					:type='playlist.type',
					:primaryid='playlist.id',
					:secondaryid='playlist.owner.id',
					:image='playlist.images',
					:title='playlist.name')
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

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
    this.fetchData();
  },
  methods: {
    ...mapMutations({
      setStage: 'SET_STAGE',
    }),

    fetchData() {
      const self = this;
      self.$startLoading('data');

      self.axios.all([
        self.getCategoryInfo(),
        self.getCategoriesPlaylists(),
      ]).then((res) => {
        const category = res[0].data,
          playlists = res[1].data.playlists.items;

        self.data.category = category;
        self.data.playlists = playlists;
        // init stage
        self.setStage({
          subtitle: self.$tc('category', 1),
          title: category.name,
        });
        self.$endLoading('data');
      });
    },

    // get category info from the api
    getCategoryInfo() {
      const self = this,
        { locale, country } = self;

      return self.$spotifyApi({
        method: 'get',
        url: `/browse/categories/${self.$route.params.id}`,
        params: {
          locale,
          country,
        },
      });
    },

    // get categories playlists from the api
    getCategoriesPlaylists() {
      const self = this,
        { locale, country } = self;

      return self.$spotifyApi({
        method: 'get',
        url: `/browse/categories/${self.$route.params.id}/playlists`,
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
