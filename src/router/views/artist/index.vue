<template lang='pug'>
.view-parent
	// stage
	ma-stage(v-show='!$isLoading("data")')

	// router view
	router-view(v-if='!$isLoading("data")')
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {

  data: () => ({
    data: {
      artistInfo: [],
      toptracks: [],
      albums: [],
      singles: [],
      appearson: [],
      related: [],
      additionalInfo: [],
    },
  }),

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
        self.getTopTracks(),
        self.getAlbums(),
        self.getSingles(),
        self.getAppearsOn(),
        self.getRelatedArtists(),
        // self.getAdditionalInfo(),
      ]).then((res) => {
        const artistInfo = res[0].data,
          toptracks = res[1].data.tracks,
          albums = res[2].data.items,
          singles = res[3].data.items,
          appearson = res[4].data.items,
          related = res[5].data.artists,
          // additionalInfo = res[6].data,
          followerCount = artistInfo.followers.total,
          stageImage = artistInfo.images[0].url; // additionalInfo.artistInsights.images[0].uri;

        self.data.artistInfo = artistInfo;
        self.data.toptracks = toptracks;
        self.data.albums = albums;
        self.data.singles = singles;
        self.data.appearson = appearson;
        self.data.related = related;
        // self.data.additionalInfo = additionalInfo;
        // init stage
        self.setStage({
          image: stageImage,
          subtitle: self.$tc('artist', 1),
          title: artistInfo.name,
          popularity: artistInfo.popularity,
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
          },
          info: [{
            value: followerCount.toLocaleString(),
            subtitle: self.$tc('follower', followerCount === 1 ? 1 : 0),
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
