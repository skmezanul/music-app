<template>
  <nav class="c-navigation">
      <ul class="c-navigation__list">

          <router-link
          v-for="(navitem, index) in items"
          class="c-navigation__item"
          tag="li"
          :key="index"
          :to="{ name: navitem.routeName, params: { id: $route.params.id }}"
          >

              <!-- item link -->
              <a class="c-navigation__link">{{ navitem.title }}</a>

          </router-link>

          <!-- active indicator -->
          <div class="c-navigation__activeIndicator" ref="activeIndicator"></div>

      </ul>
  </nav>
</template>

<script>
import { TweenMax } from 'gsap';

export default {

  props: {
    items: {
      type: Array,
      required: true,
    },
  },

  created() {
    const self = this;

    self.$nextTick(() => {
      self.updateActiveIndicator();
    });
  },

  watch: {
    $route() {
      const self = this;

      self.$nextTick(() => {
        self.updateActiveIndicator();
      });
    },
  },

  methods: {
    // update active element indicator
    updateActiveIndicator() {
      const self = this,
        { activeIndicator } = self.$refs,
        activeItem = self.$el.querySelector('.is-exact-active');

      // tween active indicator
      TweenMax.to(activeIndicator, 0.5, {
        x() {
          return activeItem ? activeItem.offsetLeft : 0;
        },
        width() {
          return activeItem ? activeItem.offsetWidth : 0;
        },
      });
    },
  },

};
</script>
