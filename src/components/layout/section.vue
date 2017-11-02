<template lang="pug">
section.page-section(:class='{ "collapsed" : isCollapsed }')
  // section header
  .section-header(v-if='title')
    h1 {{ title }}

    // show more/less
    .section-actions(@click='toggleCollapse', v-if='collapsible')
      span(v-if='!collapsed')
        | {{ $t("showless") }}
        i.material-icons keyboard_arrow_up
      span(v-if='collapsed')
        | {{ $t("showmore") }}
        i.material-icons keyboard_arrow_down

  // section slot
  slot

  p.copyright(v-if='copyright') {{ copyright }}
</template>

<script>
export default {
  data() {
    return {
      collapsed: true,
    };
  },
  props: [
    'title',
    'collapsible',
    'copyright',
  ],
  methods: {
    // toggle collapse
    toggleCollapse() {
      this.collapsed = !this.collapsed;
    },
  },
  computed: {
    // check if section is collapsed
    isCollapsed() {
      const isCollapsed = this.collapsible && this.collapsed;
      if (isCollapsed) {
        return true;
      }
      return false;
    },
  }
};
</script>

<style lang="scss">
.page-section {
    @include flex($display: flex, $direction: column);
    margin: 30px 0;
    &:last-child {
        padding-bottom: 81px;
        @media (max-width: $breakpoint-mobile) {
            padding-bottom: 141px;
        }
    }

    .section-items-container {
        @include flex($display: flex, $wrap: wrap);
        margin: 0 -7px;
    }

    &.collapsed {
        .list-item:nth-child(n+4),
        .section-item.artist:nth-child(n+5) {
            display: none;
        }
        @media (min-width: $breakpoint-mobile) {
            .section-item:nth-child(n+6) {
                display: none;
            }
        }
        @media (max-width: $breakpoint-mobile) {
            .section-item:nth-child(n+5) {
                display: none;
            }
        }
        p, pre {
          display: none;
        }
    }

    .biography {
        margin: 0;
        @include font($size: 1.1em, $weight: 300, $line: 1.5em, $color: rgba($white, 0.9));
    }

    .copyright {
      @include font($size: 0.7em, $weight: 300, $color: rgba($white, 0.7));
    }

    .section-header {
        @include flex($display: flex, $justify: space-between, $align: center);
        margin-bottom: 25px;
        .section-actions {
            span {
                @include item-hover;
                @include flex($display: flex, $align: center);
                white-space: nowrap;
            }
        }
    }
}
</style>
