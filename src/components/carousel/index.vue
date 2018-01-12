<template lang='pug'>
flickity(ref='slider', :options='options')
    ma-cell(
      v-for='(item, index) in cells',
      :key='index'
      :index='index',
      :image='item.images',
      :title='item.name',
      :type='item.type',
      :primaryid='item.id',
      :secondaryid='item.owner.id')
</template>

<script>
import Flickity from 'vue-flickity';
import maCell from './cell';

export default {
  data() {
    return {
      options: {
        initialIndex: 3,
        prevNextButtons: false,
        pageDots: false,
        autoPlay: 5000,
        wrapAround: true,
      },
    };
  },
  props: {
    cells: Array,
  },
  components: {
    Flickity,
    maCell,
  },
};
</script>

<style lang='scss'>
.flickity-enabled {
  outline: none;
}
</style>
