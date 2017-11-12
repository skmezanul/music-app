<template lang="pug">
.view-parent(v-if='!$isLoading("data")')
	// stage
	ma-stage

	// router view
	router-view
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
  data() {
    return {
      data: {
        featured: [],
        releases: [],
        categories: [],
        charts: [],
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
      const that = this;
      that.$startLoading('data');

      that.axios.all([
          that.getFeaturedPlaylists(),
          that.getNewReleases(),
          that.getCategories(),
          that.getCharts(),
        ]).then((res) => {
          that.data.featured = res[0].data;
          that.data.releases = res[1].data;
          that.data.categories = res[2].data.categories;
          that.data.charts = res[3].data.tracks.items;
          // init stage
          that.setStage({
            image: that.currentUser.images[0].url,
            subtitle: that.$t('browse'),
            title: that.getGreeting,
            navigation: [{
                title: this.$t('overview'),
                routeName: 'browse',
              },
              {
                title: this.$t('charts'),
                routeName: 'browseCharts',
              },
              {
                title: this.$tc('category', 0),
                routeName: 'browseCategories',
              },
              {
                title: this.$t('newreleases'),
                routeName: 'browseReleases',
              },
              {
                title: this.$t('discover'),
                routeName: 'browseDiscover',
              },
            ],
          });
          that.$endLoading('data');
        });
    },

    // get featured playlists from the api
    getFeaturedPlaylists() {
      const that = this,
        country = that.country;

      return that.$spotifyApi({
        method: 'get',
        url: '/browse/featured-playlists',
        params: {
          country,
        },
      });
    },

    // get new releases from the api
    getNewReleases() {
      const that = this,
        country = that.country;

      return that.$spotifyApi({
        method: 'get',
        url: '/browse/new-releases',
        params: {
          country,
        },
      });
    },

    // get categories from the api
    getCategories() {
      const that = this,
        locale = that.locale;

      return that.$spotifyApi({
        method: 'get',
        url: '/browse/categories',
        params: {
          limit: 15,
          locale,
        },
      });
    },

    // get charts from the api
    getCharts() {
      const that = this,
        user = 'spotifycharts',
        playlist = '37i9dQZEVXbMDoHDwVN2tF';

      return that.$spotifyApi({
        method: 'get',
        url: `/users/${user}/playlists/${playlist}`,
      });
    },
  },
  computed: {
    ...mapGetters({
      currentUser: 'getCurrentUser',
      country: 'getCountry',
      locale: 'getLocale',
    }),

    // greeting depending on time of day
    getGreeting() {
      const that = this,
        fullName = that.currentUser.display_name,
        firstName = fullName.split(' ')[0],
        hour = new Date().getHours();

      let greeting;

      if (hour >= 5 && hour < 12) {
        greeting = that.$t('greetings.morning');

      } else if (hour >= 12 && hour < 18) {
        greeting = that.$t('greetings.afternoon');

      } else if (hour >= 18 && hour < 23) {
        greeting = that.$t('greetings.evening');

      } else {
        greeting = that.$t('greetings.night');

      }

      return `${greeting} ${firstName}`;
    },
  },
};
</script>
