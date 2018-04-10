<template>
<api-request
class="c-sidebarPanel__parent"
:resource="dataToFetch"
v-model="response"
spinner=""
>

    <maPanelList
    v-if="response.albums"
    :items="listItems"
    @close-panel="$emit('close-panel')"
    ></maPanelList>

</api-request>
</template>

<script>
import { mapGetters } from 'vuex';
import {
  getFeaturedPlaylists,
  getMyPlaybackHistory,
  getMyProfile,
} from '@/api/providers/spotify';

import maPanelList from '../panelList';

export default {

  data: () => ({
    response: {},
  }),

  computed: {
    ...mapGetters({
      currentPlayback: 'playback/getCurrentPlayback',
    }),

    // get items for list
    listItems() {
      const self = this,
        { response } = self,
        featuredMessage = response.featured.message,
        trackCount = response.tracks.total,
        albumCount = response.albums.total,
        lastPlayedArtist = response.history.items[0].track.artists[0].name;

      return [{
        name: 'browse',
        routeName: 'browse',
        meta: featuredMessage,
      },
      {
        name: 'recentlyplayed',
        routeName: 'mylibraryHistory',
        meta: lastPlayedArtist,
      },
      {
        name: 'track',
        routeName: 'mylibraryTracks',
        meta: `${trackCount} ${self.$tc('track', trackCount === 1 ? 1 : 0)}`,
      },
      {
        name: 'album',
        routeName: 'mylibraryAlbums',
        meta: `${albumCount} ${self.$tc('album', albumCount === 1 ? 1 : 0)}`,
      }];
    },

    // get data to fetch from api
    dataToFetch() {
      return {
        featured: () => getFeaturedPlaylists(),
        history: () => getMyPlaybackHistory({ type: 'track' }),
        tracks: () => getMyProfile({ type: 'tracks' }),
        albums: () => getMyProfile({ type: 'albums' }),
      };
    },
  },

  components: {
    maPanelList,
  },

};
</script>
