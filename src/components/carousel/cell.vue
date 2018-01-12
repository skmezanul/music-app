<template lang='pug'>
transition(@beforeEnter='getColorFromAlbumCover', appear)
  router-link.carousel-cell(:style='{ backgroundColor }', :to='{ name: type, params: { id: primaryid, owner: secondaryid }}', tag='div')
      .cell-content
        .cover-container
          img.cover-image(:src='image[0].url', :alt='title')
        h1.title {{ title }}
      .cell-background
        svg.vector-background.lines(v-if='index % 2 == 0')
          rect(:fill='contrastColor', x='280', y='-36', rx='10', ry='10', transform='rotate(135 419 -26)')
          rect(:fill='contrastColor', x='391', y='75', rx='10', ry='10', transform='rotate(135 530 85)')
          rect(:fill='contrastColor', x='335', y='75', rx='10', ry='10', transform='rotate(135 474 86)')
          rect(:fill='contrastColor', x='291', y='64', rx='10', ry='10', transform='rotate(135 431 73)')
          rect(:fill='contrastColor', x='279', y='20', rx='10', ry='10', transform='rotate(135 418 30)')
        svg.vector-background.crosses(v-else)
          rect(:fill='contrastColor', width='8', height='39', x='45', y='35', rx='4', ry='4')
          rect(:fill='contrastColor', width='8', height='39', x='45', y='35', rx='4', ry='4', transform='rotate(90 49 55)')
          rect(:fill='contrastColor', width='13', height='63', x='62', y='192', rx='4', ry='4')
          rect(:fill='contrastColor', width='13', height='63', x='62', y='192', rx='4', ry='4', transform='rotate(90 68 224)')
          rect(:fill='contrastColor', width='11', height='54', x='111', y='101', rx='4', ry='4')
          rect(:fill='contrastColor', width='11', height='54', x='111', y='101', rx='4', ry='4', transform='rotate(90 116 128)')
          rect(:fill='contrastColor', width='10', height='48', x='430', y='236', rx='4', ry='4')
          rect(:fill='contrastColor', width='10', height='48', x='430', y='236', rx='4', ry='4', transform='rotate(90 435 260)')
          rect(:fill='contrastColor', width='12', height='62', x='393', y='24', rx='4', ry='4')
          rect(:fill='contrastColor', width='12', height='62', x='393', y='24', rx='4', ry='4', transform='rotate(90 399 55)')
          rect(:fill='contrastColor', width='7', height='36', x='440', y='136', rx='1', ry='1')
          rect(:fill='contrastColor', width='7', height='36', x='440', y='136', rx='1', ry='1', transform='rotate(90 444 154)')
          rect(:fill='contrastColor', width='3', height='15', x='156', y='276', rx='1', ry='1')
          rect(:fill='contrastColor', width='3', height='16', x='157', y='275', rx='1', ry='1', transform='rotate(90 158 283)')
          rect(:fill='contrastColor', width='3', height='15', x='403', y='196', rx='1', ry='1')
          rect(:fill='contrastColor', width='3', height='16', x='404', y='195', rx='1', ry='1', transform='rotate(90 405 203)')
</template>

<script>
import * as Vibrant from 'node-vibrant';

export default {
  data() {
    return {
      backgroundColor: '',
      contrastColor: '#fff',
    };
  },
  props: {
    title: String,
    image: Array,
    index: Number,
    type: String,
    primaryid: String,
    secondaryid: String,
  },
  methods: {
    // get background color from image
    getColorFromAlbumCover() {
      const self = this,
        backgroundColor = self.color,
        image = self.image[0].url;
      if (!backgroundColor && image) {
        Vibrant.from(image).getPalette()
          .then((palette) => {
            const background = palette.Vibrant.getHex(),
              contrast = palette.Vibrant.getTitleTextColor();
            if (background) {
              self.backgroundColor = background;
            }
            if (contrast) {
              self.contrastColor = contrast;
            }
          });
      }
    },
  },
};
</script>

<style lang='scss'>
.carousel-cell {
    @include relative;
    overflow: hidden;
    margin: 0 1em;
    border-radius: 1em;
    background-color: $grey;
    box-shadow: $shadow;
    cursor: pointer;
    size: 500px 300px;
    &:before {
      @include absolute($all: 0);
      background: ease-in-out-sine-gradient(to top, rgba($main-bg-color, 0.5), rgba($main-bg-color, 0));
      content: "";
    }
    .cell-content {
        @include absolute($all: 15px, $index: 1);
        @include flex($display: flex, $justify: center, $align: center, $direction: column);
        text-align: center;
        .cover-container {
            overflow: hidden;
            border-radius: 10px;
            box-shadow: $shadow;
            .cover-image {
                size: 180px;
            }
        }
        .title {
            @include font($size: 1.5em);
            margin-top: 1em;
        }
    }
    .cell-background {
        size: 100%;
        .vector-background {
            @supports (mix-blend-mode: overlay) {
              mix-blend-mode: overlay;
            }
            opacity: 0.5;
            size: 100%;
            &.lines {
                rect {
                    size: 279px 20px;
                }
            }
        }
    }
}
</style>
