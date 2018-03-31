<template lang='pug'>
.view-content

    // featured playlists
    ma-section(
      :title='parentData.featured.message',
      :collapsible='true')

      .section-items-container
        ma-item(
          v-for='playlist in parentData.featured.playlists.items',
          :key='playlist.id',
          :type='playlist.type',
          :primaryid='playlist.id',
          :secondaryid='playlist.owner.id',
          :image='playlist.images',
          :title='playlist.name')

    // new releases
    ma-section(
      :title='$t("newreleases")',
      :collapsible='true')

      .section-items-container
        ma-item(
          v-for='album in parentData.releases.albums.items',
          :key='album.id',
          :type='album.type',
          :primaryid='album.id',
          :image='album.images',
          :title='album.name',
          :artists='album.artists')
</template>

<script>
export default {

  props: {
    parentData: {
      type: Object,
      required: true,
    },
  },

};
</script>
