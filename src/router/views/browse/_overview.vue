<template lang='pug'>
.view-content(v-if='!$isLoading("data")')
  // featured playlists
  ma-section(
    :title='$parent.data.featured.message',
    :collapsible='true')

    .section-items-container
      ma-item(
        v-for='(playlist, index) in $parent.data.featured.playlists.items',
        :key='index',
        :type='playlist.type',
        :primaryid='playlist.id',
        :secondaryid='playlist.owner.id',
        :image='playlist.images',
        :title='playlist.name')

  // new releases
  ma-section(:title='$t("newreleases")', :collapsible='true')

    .section-items-container
      ma-item(
        v-for='(album, index) in $parent.data.releases.albums.items',
        :key='index',
        :type='album.type',
        :primaryid='album.id',
        :image='album.images',
        :title='album.name',
        :artists='album.artists')
</template>
