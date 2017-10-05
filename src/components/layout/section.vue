<template lang="pug">
transition(name='fade', appear)
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
    display: flex;
    flex-direction: column;
    margin: 30px 0;
    &:last-child {
        @media (min-width: $breakpoint-mobile) {
            padding-bottom: 81px;
        }
        @media (max-width: $breakpoint-mobile) {
            padding-bottom: 141px;
        }
    }

    .section-items-container {
        display: flex;
        flex-flow: row wrap;
        margin: 0 -7px;
    }

    &.collapsed {
        .row:nth-child(n+4),
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
        color: rgba($white, 0.9);
        font-weight: 300;
        font-size: 1.1em;
        line-height: 1.5em;
    }

    .section-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 25px;
        .section-actions {
            span {
                @include item-hover;
                display: flex;
                align-items: center;
                white-space: nowrap;
            }
        }
    }
}
</style>
