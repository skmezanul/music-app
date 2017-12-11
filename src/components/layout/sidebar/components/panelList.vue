<template lang='pug'>
transition(@enter='panelListEnter', :css='false', appear)
  ul.panel-list
    .active-indicator(ref='activeIndicator')
    router-link.panel-list-item(
      v-for='item in items',
      :key='item.name',
      tag='li',
      :to='getRouteFromData(item)',
      @click.native='updateActiveIndicator')
      span.item-title {{ $tc(item.name, 0) }}
      .meta-container
        span {{ getMetaFromData(item) }}
</template>

<script>
import {
  TweenMax,
} from 'gsap';

import {
  mapGetters,
} from 'vuex';

export default {
  props: {
    items: Array,
  },
  methods: {
    getRouteFromData(item) {
      const self = this;
      let name = item.routeName,
        owner,
        id;

      /* eslint-disable prefer-destructuring */
      if (item.type) {
        name = item.type;
        id = item.id;
        owner = item.owner.id;
      } else if (item.routeName === 'user') {
        id = self.currentUser.id;
      }
      return { name, params: { id, owner } };
    },

    getMetaFromData(item) {
      const self = this,
        displayName = self.currentUser.display_name,
        { meta, name, tracks } = item;
      let itemMeta = self.$t(meta);

      if (meta === '...') {
        itemMeta = meta;
      } else if (name === 'logout') {
        itemMeta = `${self.$t('loggedinas')} ${displayName}`;
      } else if (tracks) {
        itemMeta = `${tracks.total} ${self.$tc('track', 0)}`;
      }
      return itemMeta;
    },

    // stagger list items on enter
    panelListEnter(el, done) {
      TweenMax.staggerFromTo('.panel-list-item', 0.5, {
        autoAlpha: 0,
      }, {
        autoAlpha: 1,
        onComplete: done,
      }, 0.05);
    },

    // update active element indicator
    updateActiveIndicator(event) {
      const self = this,
        { activeIndicator } = self.$refs,
        clickedElement = event.target,
        parentElement = clickedElement.closest('.panel-list-item'),
        spaceAboveElement = parentElement.offsetTop,
        elementHeight = parentElement.offsetHeight;
      TweenMax.to(activeIndicator, 0.5, {
        height: elementHeight,
        y: spaceAboveElement,
        onComplete: self.settings.fixedSidebar ? null : self.$emit('close-panel'),
      });
      TweenMax.to(parentElement, 0.1, {
        scale: 0.7,
        pointerEvents: 'none',
        repeat: 1,
        yoyo: true,
      });
    },
  },
  computed: {
    ...mapGetters({
      settings: 'getAppSettings',
      currentUser: 'getCurrentUser',
    }),
  },
};
</script>

<style lang='scss'>
.panel-list {
    .panel-list-item {
        margin-bottom: 1.5em;
        transition: transform 0.5s;
        &:hover {
            cursor: pointer;
            transform: translateX(7px);
        }
        .item-title {
            display: block;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-weight: 600;
            font-size: 1.1em;
        }
        .meta-container {
            margin-top: 5px;
            color: rgba($white, 0.7);
            font-size: 0.9em;
        }
    }
}

.active-indicator {
    @include absolute($left: -1px, $index: 3);
    width: 1px;
    background-color: var(--accent-color);
}
</style>
