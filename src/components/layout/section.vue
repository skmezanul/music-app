<template>
<section class="c-viewSection" :class="sectionClasses">

    <!-- section header -->
    <div class="c-viewSection__header" v-if="title">

        <!-- title -->
        <h1 class="c-viewSection__title">{{ title }}</h1>

        <!-- actions -->
        <div class="c-viewSection__actions" v-if="actions">

          <div class="c-viewSection__carouselControls" v-if="$slots.default">

              <ma-icon
              class="c-viewSection__carouselControlsIcon"
              :class="{ 'is-disabled' : isScrolledToStart }"
              @click.native="scrollToLeft"
              >

              keyboard_arrow_left

              </ma-icon>

              <ma-icon
              class="c-viewSection__carouselControlsIcon"
              :class="{ 'is-disabled' : isScrolledToEnd }"
              @click.native="scrollToRight"
              >

              keyboard_arrow_right

              </ma-icon>

          </div>

          <div class="c-viewSection__collapseToggle" v-else-if="$slots.list" @click="toggleCollapse">

              <span>{{ $t(collapsed ? 'showmore' : 'showless')}}</span>
              <ma-icon class="c-viewSection__collapseToggleIcon">keyboard_arrow_up</ma-icon>

          </div>

        </div>

    </div>

    <!-- default slot -->
    <div class="c-viewSection__carouselWrapper" v-if="$slots.default">

      <transition name="fade">
        <div
        v-show="!isScrolledToStart"
        class="c-viewSection__overflowGradient c-viewSection__overflowGradient--left"
        ></div>
      </transition>

      <div ref="sectionInner" class="c-viewSection__inner c-viewSection__inner--gutter">
        <slot></slot>
      </div>

      <transition name="fade">
        <div
        v-show="!isScrolledToEnd"
        class="c-viewSection__overflowGradient c-viewSection__overflowGradient--right"
        ></div>
      </transition>

    </div>

    <!-- list slot -->
    <ol class="c-viewSection__inner c-viewSection__inner--wrap" v-if="$slots.list">
      <slot name="list"></slot>
    </ol>

    <span class="c-viewSection__copyright" v-if="copyright">{{ copyright }}</span>

</section>
</template>

<script>
import { TweenMax } from 'gsap';

export default {

  data: () => ({
    collapsed: true,
    carouselPosition: 0,
  }),

  props: {
    title: {
      type: String,
      default: '',
    },
    actions: {
      type: Boolean,
      default: true,
    },
    copyright: {
      type: String,
      default: '',
    },
  },

  methods: {
    // toggle collapse
    toggleCollapse() {
      const self = this;

      if (self.collapsible) self.collapsed = !self.collapsed;
    },

    // scroll the carousel to the left
    scrollToLeft() {
      const self = this;

      if (self.isScrolledToStart) self.scrollCarousel(-1);
    },

    // scroll the carousel to the right
    scrollToRight() {
      const self = this;

      if (self.isScrolledToEnd) self.scrollCarousel(1);
    },

    // scroll the inner section container
    scrollCarousel(direction) {
      const self = this,
        el = self.$el,
        { sectionInner } = self.$refs,
        box = el.querySelector('.c-box'),
        boxWidth = 270;

      TweenMax.to(sectionInner, 0.3, {
        x() {
          if (direction < 0) self.carouselPosition += boxWidth;
          else self.carouselPosition -= boxWidth;

          return self.carouselPosition;
        },
      });
    },
  },

  computed: {
    // section classes
    sectionClasses() {
      const self = this;

      return {
        'c-viewSection--carousel': self.$slots.default && self.actions,
        'is-collapsed': self.$slots.list && self.isCollapsed,
      };
    },

    // check if the carousel is scrolled to the start
    isScrolledToStart() {
      const self = this,
        isScrolledToStart = self.carouselPosition < 0;

      return isScrolledToStart;
    },

    // check if the carousel is scrolled to the end
    isScrolledToEnd() {
      const self = this,
        { sectionInner } = self.$refs,
        innerWidth = 1280,
        isScrolledToEnd = self.carouselPosition > (innerWidth * -1);

      return isScrolledToEnd;
    },

    // get list elements inside the section
    listElementsInside() {
      const self = this,
        children = self.$children,
        listElementsInside = children.filter(child => child.$options.name === 'ma-list');

      return listElementsInside;
    },

    // get box elements inside the section
    boxElementsInside() {
      const self = this,
        children = self.$children,
        boxElementsInside = children.filter(child => child.$options.name === 'ma-box');

      return boxElementsInside;
    },

    // check if section is collapsed
    isCollapsed() {
      const self = this,
        isCollapsed = self.collapsible && self.collapsed;

      return isCollapsed;
    },
  },

};
</script>
