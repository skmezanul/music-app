<template lang="pug">
section.view-section(:class='{ "collapsed" : isCollapsed }')
  // section header
  .section-header(v-if='title')
    h1 {{ title }}

    // show more/less
    .section-actions(@click='toggleCollapse', v-if='collapsible')
      .toggle-collapse
        span {{ $t(collapsed ? 'showmore' : 'showless')}}
        i.material-icons(:class='{ "collapsed" : isCollapsed }') keyboard_arrow_up

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
.view-section {
  display: grid;
  grid-auto-flow: auto;
  grid-gap: 1em;
    @media (max-width: $mobile-breakpoint) {
        padding: 1em;
    }
    &:last-child {
        padding-bottom: 100px;
        @media (max-width: $mobile-breakpoint) {
            padding-bottom: 150px;
        }
    }

    .section-items-container {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        grid-gap: 1.2em;
        @media (max-width: $mobile-breakpoint) {
            grid-template-columns: repeat(2, 1fr);
        }
    }

    &.collapsed {
        .list-item:nth-child(n+4) {
            display: none;
        }
        @media (min-width: $mobile-breakpoint) {
            .section-item:nth-child(n+6) {
                display: none;
            }
        }
        @media (max-width: $mobile-breakpoint) {
            .section-item:nth-child(n+5) {
                display: none;
            }
        }
        p,
        pre {
            display: none;
        }
    }

    .biography {
        margin: 0;
        @include font($size: 1.1em, $weight: 200, $line: 1.5em, $color: rgba($white, 0.9));
    }

    .copyright {
        @include font($size: 0.7em, $weight: 200, $color: rgba($white, 0.7));
    }

    .section-header {
        @include flex($display: flex, $justify: space-between, $align: center);
        .section-actions {
          .toggle-collapse {
              @include item-hover;
              @include flex($display: flex, $align: center);
              white-space: nowrap;
              i {
                transition: transform 0.3s;
                &.collapsed {
                  transform: scaleY(-1);
                }
              }
          }
        }
    }
}
</style>
