<template lang='pug'>
api-request.view-parent(:resource='dataToFetch', v-model='response')

  // stage
  ma-stage(
    v-if='response.artistInfo',
    :image='response.artistInfo.images',
    :subtitle='$tc("artist", 1)',
    :title='response.artistInfo.name',
    :navigation='getNavigation',
    :popularity='response.artistInfo.popularity',
    :info='getInfo',
    :buttons='getButtons')

  // router view
  transition(name='fade', mode='out-in')
    keep-alive
      router-view(:parent-data='response')
</template>

<script>
export default {

  data: () => ({
    response: {},
  }),

  computed: {
    // get data to fetch from api
    dataToFetch() {
      const self = this,
        api = self.$api,
        { id } = self.$route.params;

      return {
        artistInfo: () => api.getArtistInfo(id),
        topTracks: () => api.getTopTracks(id),
        albums: () => api.getAlbums(id, 'album'),
        singles: () => api.getAlbums(id, 'single'),
        appearsOn: () => api.getAlbums(id, 'appears_on'),
        relatedArtists: () => api.getRelatedArtists(id),
      };
    },

    // get stage navigation
    getNavigation() {
      const self = this;

      return [{
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
      }];
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

    // get stage buttons
    getButtons() {
      return {
        playall: true,
        follow: true,
        share: true,
      };
    },
  },

};
</script>
