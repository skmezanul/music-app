<template lang='pug'>
api-request.o-view__parent(:resource='dataToFetch', v-model='response')

  // stage
  ma-stage(
    v-if='response.results',
    :image='response.results.tracks.items[0].album.images',
    :subtitle='$tc("search", 1)',
    :title='`${$t("resultsfor")} "${$route.params.query}"`')

  .o-view__content
    // tracks
    ma-section(
      v-if='response.results && response.results.tracks.items',
      :title='`${$tc("track", 0)} (${response.results.tracks.items.length})`',
      :collapsible='true')

      ma-list(
        slot='list'
        v-for='(track, index) in response.results.tracks.items',
        :key='track.id',
        :trackId='track.id',
        :image='track.album.images',
        :title='track.name',
        :artists='track.artists',
        :album='track.album',
        :explicit='track.explicit',
        :popularity='track.popularity',
        :duration='track.duration_ms',
        :index='index')

    // albums
    ma-section(
      v-if='response.results && response.results.albums.items',
      :title='`${$tc("album", 0)} (${response.results.albums.items.length})`',
      :collapsible='true')

      ma-box(
        v-for='album in response.results.albums.items',
        :key='album.id',
        :type='album.type',
        :primaryid='album.id',
        :secondaryid='album.artists[0].id',
        :image='album.images',
        :title='album.name',
        :artists='album.artists')

    // artists
    ma-section(
      v-if='response.results && response.results.artists.items',
      :title='`${$tc("artist", 0)} (${response.results.artists.items.length})`',
      :collapsible='true')

      ma-box(
        v-for='artist in response.results.artists.items',
        :key='artist.id',
        :type='artist.type',
        :title='artist.name',
        :image='artist.images',
        :primaryid='artist.id')
</template>


<script>
import { getSearchResults } from '@/api/providers/spotify';

export default {

  data: () => ({
    response: {},
  }),

  computed: {
    // get data to fetch from api
    dataToFetch() {
      const self = this,
        { query } = self.$route.params;

      return {
        results: () => getSearchResults({ type: 'album,artist,track', query }),
      };
    },
  },

};
</script>
