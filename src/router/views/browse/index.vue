<template lang="pug">
main.main-container
	// stage
	ma-stage(
	:subtitle='$t("browse")',
	:navigation='navigation',
	:image='currentUser.images[0].url',
	:title='greeting')

	// router view
	router-view
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      data: {
        featured: [],
        releases: [],
        categories: [],
        charts: [],
      },
      navigation: [{
          title: this.$t('overview'),
          name: 'browse',
        },
        {
          title: this.$t('charts'),
          name: 'browseCharts',
        },
        {
          title: this.$tc('category', 0),
          name: 'browseCategories',
        },
        {
          title: this.$t('newreleases'),
          name: 'browseReleases',
        },
        {
          title: this.$t('discover'),
          name: 'browseDiscover',
        },
      ],
    };
  },
  created() {
    // fetch the data when the view is created and the data is
    // already being observed
    this.$startLoading('fetching data');
    this.getFeaturedPlaylists();
    this.getNewReleases();
    this.getCategories();
    this.getCharts();
  },
  methods: {
    // get featured playlists from the api
    getFeaturedPlaylists() {
      const that = this,
            country = that.country;

      that.$spotifyApi({
        method: 'get',
        url: '/browse/featured-playlists',
        params: {
          country,
        },
      }).then((res) => {
        that.data.featured = res.data;
        that.$endLoading('fetching data');
      });
    },

    // get new releases from the api
    getNewReleases() {
      const that = this,
            country = that.country;

      that.$spotifyApi({
        method: 'get',
        url: '/browse/new-releases',
        params: {
          country,
        },
      }).then((res) => {
        that.data.releases = res.data;
      });
    },

    // get categories from the api
    getCategories() {
      const that = this,
            locale = that.locale;

      that.$spotifyApi({
        method: 'get',
        url: '/browse/categories',
        params: {
          limit: 15,
          locale,
        },
      }).then((res) => {
        that.data.categories = res.data.categories;
      });
    },

    // get charts from the api
    getCharts() {
      const that = this,
            user = 'spotifycharts',
            playlist = '37i9dQZEVXbMDoHDwVN2tF';

      that.$spotifyApi({
        method: 'get',
        url: `/users/${user}/playlists/${playlist}`,
      }).then((res) => {
        that.data.charts = res.data.tracks.items;
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
    greeting() {
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

      } else if (hour >= 23 && hour < 5) {
        greeting = that.$t('greetings.night');

      }

      return `${greeting} ${firstName}`;
    },
  },
};
</script>
