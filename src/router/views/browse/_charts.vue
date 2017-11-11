<template lang="pug">
.view-content(v-if='!$isLoading("data")')
  // charts
  ma-section(:title='$t("charts")')

    ol.list
      ma-list(
        v-for='(item, index) in $parent.data.charts',
        :key='item.track.id',
        :type='item.track.type',
        :image='item.track.album.images',
        :title='item.track.name',
        :trackid='item.track.id',
        :artists='item.track.artists',
        :album='item.track.album',
        :explicit='item.track.explicit',
        :duration='item.track.duration_ms',
        :index='index')
</template>
