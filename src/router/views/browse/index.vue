<template lang="pug">
.view-parent
	// stage
	ma-stage(v-show='!$isLoading("data")')

	// router view
	router-view(v-if='!$isLoading("data")')
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
      const self = this;
      self.$startLoading('data');

      self.axios.all([
        self.getFeaturedPlaylists(),
        self.getNewReleases(),
        self.getCategories(),
        self.getCharts(),
      ]).then((res) => {
        self.data.featured = res[0].data;
        self.data.releases = res[1].data;
        self.data.categories = res[2].data.categories;
        self.data.charts = res[3].data.tracks.items;
        // init stage
        self.setStage({
          image: self.currentUser.images[0].url,
          subtitle: self.$t('browse'),
          title: self.getGreeting,
          navigation: [{
            title: self.$t('overview'),
            routeName: 'browse',
          },
          {
            title: self.$t('charts'),
            routeName: 'browseCharts',
          },
          {
            title: self.$tc('category', 0),
            routeName: 'browseCategories',
          },
          {
            title: self.$t('newreleases'),
            routeName: 'browseReleases',
          },
          {
            title: self.$t('discover'),
            routeName: 'browseDiscover',
          },
          ],
        });
        self.$endLoading('data');
      });
    },

    // get featured playlists from the api
    getFeaturedPlaylists() {
      const self = this,
        { country } = self;

      return self.$spotifyApi({
        method: 'get',
        url: '/browse/featured-playlists',
        params: {
          country,
        },
      });
    },

    // get new releases from the api
    getNewReleases() {
      const self = this,
        { country } = self;

      return self.$spotifyApi({
        method: 'get',
        url: '/browse/new-releases',
        params: {
          country,
        },
      });
    },

    // get categories from the api
    getCategories() {
      const self = this,
        { locale } = self;

      return self.$spotifyApi({
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
      const self = this,
        user = 'spotifycharts',
        playlist = '37i9dQZEVXbMDoHDwVN2tF';

      return self.$spotifyApi({
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
      const self = this,
        fullName = self.currentUser.display_name,
        firstName = fullName.split(' ')[0],
        hour = new Date().getHours();

      let greeting;

      if (hour >= 5 && hour < 12) {
        greeting = self.$t('greetings.morning');
      } else if (hour >= 12 && hour < 18) {
        greeting = self.$t('greetings.afternoon');
      } else if (hour >= 18 && hour < 23) {
        greeting = self.$t('greetings.evening');
      } else {
        greeting = self.$t('greetings.night');
      }

      return `${greeting} ${firstName}`;
    },
  },
};
</script>
