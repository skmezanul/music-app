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
import { mapGetters } from 'vuex';

export default {

  data: () => ({
    response: {},
  }),

  computed: {
    ...mapGetters('auth', {
      spotifyBackendToken: 'getBackendToken',
    }),

    // get data to fetch from api
    dataToFetch() {
      const self = this,
        api = self.$api,
        { id } = self.$route.params;

      let dataToFetch = {
        artistInfo: () => api.getArtistInfo(id),
        topTracks: () => api.getTopTracks(id),
        albums: () => api.getAlbums(id, 'album'),
        singles: () => api.getAlbums(id, 'single'),
        appearsOn: () => api.getAlbums(id, 'appears_on'),
        relatedArtists: () => api.getRelatedArtists(id),
      };

      if (self.spotifyBackendToken) {
        dataToFetch = Object.assign({
          additionalArtistInfo: () => api.getAdditionalArtistInfo(id),
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
