<template lang='pug'>
api-request.o-view__parent(:resource='dataToFetch', v-model='response')

  // stage
  ma-stage(
    v-if='response.artistInfo',
    :image='getHeaderImage',
    :subtitle='$tc("artist", 1)',
    :title='response.artistInfo.name',
    :navigation='getNavigation',
    :popularity='response.artistInfo.popularity',
    :info='getInfo')

  // router view
  transition(name='fade', mode='out-in')
    keep-alive
      router-view(:parent-data='response')
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {

  data: () => ({
    response: {},
  }),

  methods: {
    ...mapActions('endpoints', {
      getArtistInfo: 'GET_ARTIST_INFO',
      getTopTracks: 'GET_TOP_TRACKS',
      getAlbums: 'GET_ALBUMS',
      getRelatedArtists: 'GET_RELATED_ARTISTS',
      getAdditionalArtistInfo: 'GET_ADDITIONAL_ARTIST_INFO',
    }),
  },

  computed: {
    ...mapGetters('auth', {
      spotifyBackendToken: 'getBackendToken',
    }),

    // get data to fetch from api
    dataToFetch() {
      const self = this,
        { id } = self.$route.params;

      let dataToFetch = {
        artistInfo: () => self.getArtistInfo({ id }),
        topTracks: () => self.getTopTracks({ id }),
        albums: () => self.getAlbums({ id, type: 'album' }),
        singles: () => self.getAlbums({ id, type: 'single' }),
        appearsOn: () => self.getAlbums({ id, type: 'appears_on' }),
        relatedArtists: () => self.getRelatedArtists({ id }),
      };

      if (self.spotifyBackendToken) {
        dataToFetch = Object.assign({
          additionalArtistInfo: () => self.getAdditionalArtistInfo({ id }),
        }, dataToFetch);
      }

      return dataToFetch;
    },

    // check if high quality header image is available
    getHeaderImage() {
      const self = this,
        { artistInfo, additionalArtistInfo } = self.response;

      let headerImage;

      if (additionalArtistInfo) headerImage = additionalArtistInfo.headerImages;
      else if (artistInfo) headerImage = artistInfo.images;

      return headerImage;
    },

    // get stage navigation
    getNavigation() {
      const self = this,
        navigation = [{
          title: self.$t('overview'),
          routeName: 'artist',
        },
        {
          title: self.$t('relatedartists'),
          routeName: 'artistRelated',
        }];

      if (self.spotifyBackendToken) {
        navigation.push({
          title: self.$t('about'),
          routeName: 'artistAbout',
        });
      }

      return navigation;
    },

    // get stage info
    getInfo() {
      const self = this,
        { artistInfo } = self.response,
        followerCount = artistInfo.followers.total;

      return [{
        value: followerCount.toLocaleString(),
        subtitle: self.$tc('follower', followerCount > 1 ? 0 : 1),
      }];
    },
  },

};
</script>
