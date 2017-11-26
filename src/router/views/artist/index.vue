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
        artistInfo: [],
        additionalInfo: [],
        toptracks: [],
        albums: [],
        singles: [],
        appearson: [],
        related: [],
      },
    };
  },
  created() {
    // fetch the data when the view is created and the data is
    // already being observedself.
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
        self.getArtistInfo(),
        // self.getAdditionalInfo(),
        self.getTopTracks(),
        self.getAlbums(),
        self.getSingles(),
        self.getAppearsOn(),
        self.getRelatedArtists(),
      ]).then((res) => {
        self.data.artistInfo = res[0].data;
        // self.data.additionalInfo = res[1].data;
        self.data.toptracks = res[1].data.tracks;
        self.data.albums = res[2].data.items;
        self.data.singles = res[3].data.items;
        self.data.appearson = res[4].data.items;
        self.data.related = res[5].data.artists;
        // init stage
        self.setStage({
          image: res[0].data.images[0].url,
          // image: res[1].data.headerImages[0].url,
          subtitle: self.$tc('artist', 1),
          title: res[0].data.name,
          popularity: res[0].data.popularity,
          navigation: [{
            title: self.$t('overview'),
            routeName: 'artist',
          },
          {
            title: self.$t('relatedartists'),
            routeName: 'artistRelated',
          },
          {
            title: self.$t('about'),
            routeName: 'artistAbout',
          },
          ],
          buttons: {
            playall: true,
            follow: true,
            share: true,
          },
          info: [{
            value: res[0].data.followers.total.toLocaleString(),
            subtitle: self.$tc('follower', 1),
          },
          ],
        });
        self.$endLoading('data');
      });
    },

    // get artist info from the api
    getArtistInfo() {
      const self = this;

      return self.$spotifyApi({
        method: 'get',
        url: `/artists/${self.$route.params.id}`,
      });
    },

    // get additional artist info
    getAdditionalInfo() {
      const self = this;

      return self.$spotifyBackendApi({
        method: 'get',
        url: `/artists/${self.$route.params.id}`,
      });
    },

    // Get this artist's top tracks from the api
    getTopTracks() {
      const self = this,
        { country } = self;

      return self.$spotifyApi({
        method: 'get',
        url: `/artists/${self.$route.params.id}/top-tracks`,
        params: {
          country,
        },
      });
    },

    // Get this artist's albums from the api
    getAlbums() {
      const self = this,
        { market } = self;

      return self.$spotifyApi({
        method: 'get',
        url: `/artists/${self.$route.params.id}/albums`,
        params: {
          market,
          album_type: 'album',
        },
      });
    },

    // Get this artist's singles from the api
    getSingles() {
      const self = this,
        { market } = self;

      return self.$spotifyApi({
        method: 'get',
        url: `/artists/${self.$route.params.id}/albums`,
        params: {
          market,
          album_type: 'single',
        },
      });
    },

    // Get album's this artist appears on from the api
    getAppearsOn() {
      const self = this,
        { market } = self;

      return self.$spotifyApi({
        method: 'get',
        url: `/artists/${self.$route.params.id}/albums`,
        params: {
          market,
          album_type: 'appears_on',
        },
      });
    },

    // get artists related to this artist from the api
    getRelatedArtists() {
      const self = this;

      return self.$spotifyApi({
        method: 'get',
        url: `/artists/${self.$route.params.id}/related-artists`,
      });
    },
  },
  computed: {
    ...mapGetters({
      country: 'getCountry',
      market: 'getMarket',
    }),
  },
};
</script>
