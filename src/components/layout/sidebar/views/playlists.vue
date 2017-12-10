<template lang='pug'>
.view-parent
  ul
    router-link(
      v-for='playlist in playlists',
      :key='playlist.name',
      tag='li',
      :to='{ name: "playlist", params: { id: playlist.id, owner: playlist.owner.id } }',
      @click.native='$emit("clicked-element", $event)')
      span.title {{ playlist.name }}
      .meta-container
        span {{ `${playlist.tracks.total} ${$tc('track', 0)}` }}
</template>

<script>
import {
  mapGetters,
} from 'vuex';

export default {
  computed: {
    ...mapGetters({
      playlists: 'getPlaylists',
    }),
  },
};
</script>
