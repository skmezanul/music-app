<template lang='pug'>
.loader-container.sidebar-margin
  transition-group.loader-inner(tag='div', @enter='startLoadingAnimation', :css='false', appear)
    span.wave-item(v-for='(n, index) in 6', :style='{ left: `${20 * index}px` }', :key='index', ref='loaderElement')
</template>

<script>
import { TweenMax, Power2 } from 'gsap';

export default {
  methods: {
    startLoadingAnimation(el, done) {
      const self = this,
        { loaderElement } = self.$refs;
      TweenMax.staggerTo(loaderElement, 1, {
        height: 60,
        repeat: -1,
        yoyo: true,
        ease: Power2.easeInOut,
        onComplete: done,
      }, 0.1);
    },
  },
};
</script>

<style lang='scss'>
.loader-container {
    @include fixed($all: 0, $index: 997);
    @include flex($display: flex, $justify: center, $align: center)
    background-color: $main-bg-color;
    .loader-inner {
        @include relative;
        width: 100px;
        .wave-item {
            @include absolute($bottom: 0);
            size: 5px;
            border-radius: 5px;
            background-color: var(--accent-color);
        }
    }
}
</style>
