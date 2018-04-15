<template>
  <div class="c-loader u-sidebarMargin">

      <transition-group
      class="c-loader__inner"
      tag="div"
      @enter="startLoadingAnimation"
      :css="false"
      appear="appear"
      >

          <!-- animated waves -->
          <span
          class="c-loader__wave"
          v-for="(n, index) in 6"
          :style="{ left: `${20 * index}px` }"
          :key="index"
          ref="loaderElement"
          ></span>

      </transition-group>

  </div>
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
