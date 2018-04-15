<template>
<section class="c-viewSection">

    <!-- section header -->
    <div class="c-viewSection__header" v-if="title">

        <!-- title -->
        <h1 class="c-viewSection__title">{{ title }}</h1>

        <!-- actions -->
        <div class="c-viewSection__actions" v-if="actions">

          <div class="c-viewSection__carouselControls" v-if="isBoxCarousel">

              <a class="c-viewSection__carouselControlsIcon c-viewSection__carouselControlsIcon--left" @click="scrollToLeft">
                <ma-icon
                :class="{ 'is-disabled' : isScrolledToStart }"
                type="large"
                :hover="true"
                >keyboard_arrow_left</ma-icon>
              </a>

              <a class="c-viewSection__carouselControlsIcon c-viewSection__carouselControlsIcon--right" @click="scrollToRight">
                <ma-icon
                type="large"
                :hover="true"
                >keyboard_arrow_right</ma-icon>
              </a>

          </div>

          <a class="c-viewSection__collapseToggle" v-else-if="isCollapsibleList" @click="toggleCollapsedList">

              <span>{{ $t(isCollapsed ? 'showmore' : 'showless')}}</span>

              <span class="c-viewSection__collapseToggleIcon" :class="{ 'is-collapsed' : isCollapsed }">
                <ma-icon>keyboard_arrow_up</ma-icon>
              </span>

          </a>

        </div>

    </div>

    <!-- default slot -->
    <ol class="c-viewSection__inner" v-if="$slots.default">
      <slot></slot>
    </ol>

    <!-- boxes slot -->
    <div class="c-viewSection__carouselWrapper" v-else-if="$slots.boxes">

      <transition name="slide-right-transform">
        <div
        v-show="!isScrolledToStart && isBoxCarousel"
        class="c-viewSection__overflowGradient c-viewSection__overflowGradient--left"
        ></div>
      </transition>

      <div
      ref="sectionInner"
      class="c-viewSection__inner"
      :class="`c-viewSection__inner--${isBoxCarousel ? 'carousel' : 'grid'}`"
      >

        <slot name="boxes"></slot>

      </div>

      <transition name="slide-left-transform">
        <div
        v-show="!isScrolledToEnd && isBoxCarousel"
        class="c-viewSection__overflowGradient c-viewSection__overflowGradient--right"
        ></div>
      </transition>

    </div>

    <!-- list slot -->
    <ol class="c-viewSection__inner c-viewSection__inner--list" v-else-if="$slots.list">
      <slot name="list"></slot>
    </ol>

    <span class="c-viewSection__copyright" v-if="copyright">{{ copyright }}</span>

</section>
</template>

<script>
import { TweenLite } from 'gsap';

export default {

  data: () => ({
    isCollapsed: true,
    carouselPosition: 0,
    innerSectionWidth: 0,
    boxChildren: 0,
    listChildren: 0,
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

  created() {
    const self = this;

    self.$nextTick(() => {
      if (self.actions) self.toggleVisibleElementCount({ count: 3 });
      if (self.isBoxCarousel) self.innerSectionWidth = self.$refs.sectionInner.offsetWidth;
    });
  },

  mounted() {
    const self = this;

    self.listChildren = self.filterChildElements({ componentName: 'ma-list' });
    self.boxChildren = self.filterChildElements({ componentName: 'ma-box' });
  },

  watch: {
    isCollapsed() {
      this.toggleVisibleElementCount({ count: 3 });
    },
  },

  methods: {
    // get elements inside the section
    filterChildElements({ componentName }) {
      const self = this,
        children = self.$children,
        elementsInside = children.filter(({ $options }) => $options.name === componentName);

      return elementsInside;
    },

    // scroll the carousel to the left
    scrollToLeft() {
      const self = this;

      if (!self.isScrolledToStart) self.scrollInnerSection({ direction: 'previous' });
    },

    // scroll the carousel to the right
    scrollToRight() {
      const self = this;

      if (!self.isScrolledToEnd) self.scrollInnerSection({ direction: 'next' });
    },

    // scroll the inner section container
    scrollInnerSection({ direction }) {
      const self = this,
        { sectionInner } = self.$refs,
        scrollWidth = self.innerSectionWidth / (self.boxChildren.length / 2);

      if (sectionInner) {
        TweenLite.to(sectionInner, 0.3, {
          x() {
            if (direction === 'next') self.carouselPosition += scrollWidth;
            else self.carouselPosition -= scrollWidth;

            return (self.carouselPosition * -1);
          },
        });
      }
    },

    // toggle collapse
    toggleCollapsedList() {
      const self = this;

      self.isCollapsed = !self.isCollapsed;
    },

    // toggle the count of visible box or list elements
    toggleVisibleElementCount({ count }) {
      const self = this,
        elementsToHide = self.listChildren.filter((item, index) => index > (count - 1));

      elementsToHide.forEach(({ $el }) => {
        TweenLite.set($el, self.isCollapsed ? { display: 'none' } : { clearProps: 'display' });
      });
    },
  },

  computed: {
    // check if the list inside is collapsible
    isCollapsibleList() {
      const self = this,
        isCollapsibleList = self.actions && self.listChildren.length > 2;

      return isCollapsibleList;
    },

    // check if is a box carousel
    isBoxCarousel() {
      const self = this,
        isCarousel = self.actions && self.boxChildren.length > 4;

      return isCarousel;
    },

    // check if the carousel is scrolled to the start
    isScrolledToStart() {
      const self = this,
        isScrolledToStart = self.$slots.boxes && self.carouselPosition === 0;

      return isScrolledToStart;
    },

    // check if the carousel is scrolled to the end
    isScrolledToEnd() {
      const self = this,
        isScrolledToEnd = self.$slots.boxes && self.carouselPosition >= self.innerSectionWidth;

      return isScrolledToEnd;
    },
  },

};
</script>
