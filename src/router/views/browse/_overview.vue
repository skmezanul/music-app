<template lang='pug'>
.view-content(v-if='!$isLoading("data")')

  // featured playlists
  ma-section(:title='$parent.data.featured.message')
    // carousel
    ma-carousel(:cells='$parent.data.featured.playlists.items')

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
