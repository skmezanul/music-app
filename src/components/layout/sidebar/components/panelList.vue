<template>
<transition @enter="panelListEnter" :css="false" appear="appear">

    <ul class="c-panelList">

        <!-- active indicator -->
        <div class="c-panelList__activeIndicator" ref="activeIndicator"></div>

        <router-link
        class="c-panelList__item"
        v-for="(item, index) in items"
        :key="index"
        tag="li"
        @click.native="onItemClick($event, index)"
        @mouseover.native="animateItemMouseEnter"
        @mouseleave.native="animateItemMouseLeave"
        :to="getRouteFromData(item)"
        >

          <!-- title -->
          <span class="c-panelList__title">{{ $tc(item.name, 0) }}</span>

          <!-- meta -->
          <div class="c-panelList__meta">
            <span>{{ getMetaFromData(item) }}</span>
          </div>

        </router-link>
    </ul>

</transition>
</template>

<script>
import { TweenMax } from 'gsap';
import { mapGetters } from 'vuex';

export default {

  data: () => ({
    activeItem: null,
  }),

  props: {
    items: {
      type: Array,
      required: true,
    },
  },

  watch: {
    $route() {
      this.updateActiveIndicator();
    },
  },

  methods: {
    onItemClick(event, index) {
      const self = this,
        el = event.currentTarget;

      self.activeItem = index;
      self.animateItemClick(el);
    },

    // stagger list items on enter
    panelListEnter(el, done) {
      const self = this,
        listItems = self.$el.querySelectorAll('.c-panelList__item');

      if (listItems) {
        TweenMax.staggerFrom(listItems, 0.5, {
          autoAlpha: 0,
          onComplete: done,
          clearProps: 'all',
        }, 0.05);
      }
    },

    // update active element indicator
    updateActiveIndicator() {
      const self = this,
        { activeIndicator } = self.$refs,
        { fixedSidebar } = self.settings,
        activeItem = self.$el.querySelector('.exact-active');

      // tween active indicator
      if (activeItem) {
        TweenMax.to(activeIndicator, 0.5, {
          y: activeItem.offsetTop,
          height() {
            return activeItem ? activeItem.offsetHeight : 0;
          },
          onComplete() {
            return fixedSidebar ? null : self.$emit('close-panel');
          },
        });
      }
    },

    // tween on click
    animateItemClick(el) {
      TweenMax.to(el, 0.2, {
        scale: 0.95,
        pointerEvents: 'none',
        repeat: 1,
        yoyo: true,
      });
    },

    // tween on hover
    animateItemMouseEnter(event) {
      const el = event.currentTarget;

      TweenMax.to(el, 0.5, {
        x: 7,
      });
    },

    // tween on mouse leave
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
      settings: 'app/getAppSettings',
      currentUser: 'user/getCurrentUser',
    }),
  },

};
</script>
