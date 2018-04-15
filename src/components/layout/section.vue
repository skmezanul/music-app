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

          <a class="c-viewSection__collapseToggle" v-else-if="isCollapsibleList" @click="toggleCollapse">

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
      class="c-viewSection__inner c-viewSection__inner--grid"
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
      if (self.actions) self.toggleVisibleElementCount(3);
    });
  },

  watch: {
    isCollapsed() {
      const self = this;

      if (self.actions) self.toggleVisibleElementCount(3);
    },
  },

  methods: {
    // get elements inside the section
    elementsInside(name) {
      const self = this,
        children = self.$children,
        elementsInside = children.filter(({ $options }) => $options.name === name);

      console.log(elementsInside);

      return elementsInside;
    },

    // toggle collapse
    toggleCollapse() {
      const self = this;

      self.isCollapsed = !self.isCollapsed;
    },

    // scroll the carousel to the left
    scrollToLeft() {
      const self = this;

      if (!self.isScrolledToStart) self.scrollInnerSection(-1);
    },

    // scroll the carousel to the right
    scrollToRight() {
      const self = this;

      if (!self.isScrolledToEnd) self.scrollInnerSection(1);
    },

    // scroll the inner section container
    scrollInnerSection(direction) {
      const self = this,
        el = self.$el,
        { sectionInner } = self.$refs,
        boxes = el.querySelectorAll('.c-box'),
        scrollWidth = self.innerSectionWidth / (boxes.length / 2);

      if (sectionInner) {
        TweenLite.to(sectionInner, 0.3, {
          x() {
            if (direction < 0) self.carouselPosition -= scrollWidth;
            else self.carouselPosition += scrollWidth;

            return (self.carouselPosition * -1);
          },
        });
      }
    },

    // toggle the count of visible box or list elements
    toggleVisibleElementCount(count) {
      const self = this,
        elements = self.elementsInside('ma-list') || self.elementsInside('ma-box');

      if (elements) {
        const elementsToHide = elements.filter((item, index) => index > (count - 1));

        elementsToHide.forEach(({ $el }) => {
          TweenLite.set($el, self.isCollapsed ? { display: 'none' } : { clearProps: 'display' });
        });
      }
    },
  },

  computed: {
    // check if the list inside is collapsible
    isCollapsibleList() {
      const self = this,
        elementCount = self.elementsInside('ma-list').length,
        isCollapsible = self.actions && elementCount > 2;

      return isCollapsible;
    },

    // check if is a box carousel
    isBoxCarousel() {
      const self = this,
        elementCount = self.elementsInside('ma-box').length,
        isCarousel = self.actions && elementCount > 4;

      return isCarousel;
    },

    // get inner section width
    innerSectionWidth() {
      const self = this,
        { sectionInner } = self.$refs,
        innerSectionWidth = sectionInner ? sectionInner.offsetWidth : 1500;

      return innerSectionWidth;
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
