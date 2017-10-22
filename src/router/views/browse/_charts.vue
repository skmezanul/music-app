<template lang="pug">
.page-container
  // charts
  ma-section(:title='$t("charts")')

    ol.list
      ma-list(
        v-for='(item, index) in $parent.data.charts',
        :key='item.track.id',
        :type='item.track.type',
        :image='item.track.album.images[0].url',
        :title='item.track.name',
        :trackid='item.track.id',
        :artists='item.track.artists',
        :album='item.track.album',
        :explicit='item.track.explicit',
        :duration='item.track.duration_ms',
        :index='index')
</template>
