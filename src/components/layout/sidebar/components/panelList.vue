<template lang='pug'>
transition(@enter='panelListEnter', :css='false', appear)
  ul.panel-list
    .active-indicator(ref='activeIndicator')
    router-link.panel-list-item(
      v-for='(item, index) in items',
      :key='index',
      tag='li',
      ref='listItem',
      @click.native='animateItemClick',
      @mouseover.native='animateItemMouseEnter',
      @mouseleave.native='animateItemMouseLeave',
      :to='getRouteFromData(item)')
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
  data() {
    return {
      activeItem: null,
    };
  },
  props: {
    items: Array,
  },
  updated() {
    this.getActiveElement();
  },
  created() {
    this.getActiveElement();
  },
  watch: {
    // check which list item is active when route changes
    $route() {
      this.getActiveElement();
    },
  },
  methods: {
    // stagger list items on enter
    panelListEnter(el, done) {
      TweenMax.staggerFrom('.panel-list-item', 0.5, {
        autoAlpha: 0,
        onComplete: done,
      }, 0.05);
    },

    // check which list item is active
    getActiveElement() {
      const self = this,
        listItems = self.$refs.listItem,
        activeClass = 'exact-active';

      if (typeof listItems !== 'undefined') {
        self.$nextTick(() => {
          listItems.forEach((value, i) => {
            const el = listItems[i].$el,
              isActive = el.classList.contains(activeClass);
            if (isActive) {
              self.updateActiveIndicator(el);
              self.activeItem = i;
            }
          });
        });
      }
    },

    // update active element indicator
    updateActiveIndicator(el) {
      const self = this,
        { activeIndicator } = self.$refs,
        { fixedSidebar } = self.settings,
        spaceAboveElement = el.offsetTop,
        elementHeight = el.offsetHeight;

      // tween active indicator
      TweenMax.to(activeIndicator, 0.5, {
        height: elementHeight,
        y: spaceAboveElement,
        onComplete: fixedSidebar ? null : self.$emit('close-panel'),
      });
    },

    // hide active element indicator
    hideActiveIndicator() {
      const self = this,
        { activeIndicator } = self.$refs;

        // tween active indicator
      TweenMax.to(activeIndicator, 0.5, {
        height: 0,
        onComplete: self.activeItem = null,
      });
    },

    // tween on click
    animateItemClick(event) {
      const el = event.currentTarget;

      TweenMax.to(el, 0.2, {
        scale: 0.95,
        pointerEvents: 'none',
        repeat: 1,
        yoyo: true,
      });
    },

    // tween on click
    animateItemMouseEnter(event) {
      const el = event.currentTarget;

      TweenMax.to(el, 0.5, {
        x: 7,
      });
    },

    // tween on click
    animateItemMouseLeave(event) {
      const el = event.currentTarget;

      TweenMax.to(el, 0.5, {
        x: 0,
      });
    },

    // get target route for item
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

    // get meta for item
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
        itemMeta = `${tracks.total} ${self.$tc('track', tracks.total > 1 ? 0 : 1)}`;
      }
      return itemMeta;
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
        cursor: pointer;
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
