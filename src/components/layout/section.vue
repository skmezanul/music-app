<template lang="pug">
transition(name='fade')
	section.page-section(:class="{ 'collapsed' : collapsible && collapsed }")
		// section header
		.section-header(v-if='title != null')
			h1 {{ title }}

			// show more/less
			.section-actions(@click='toggleCollapse', v-if='collapsible')
				span(v-if='!collapsed')
					| Show Less
					i.material-icons keyboard_arrow_up
				span(v-if='collapsed')
					| Show More
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
    toggleCollapse() {
      this.collapsed = !this.collapsed;
    },
  },
};
</script>

<style lang="scss">
.page-section {
    display: flex;
    flex-direction: column;
    margin: 30px 0;

    &.collapsed {
        .section-item:nth-child(n+6),
        .section-item.artist:nth-child(n+5),
        .row:nth-child(n+6) {
            display: none;
        }
    }

    .biography {
        font-weight: 300;
        line-height: 1.5em;
        color: rgba($white, 0.9);
        font-size: 1.1em;
        margin: 0;
    }

    .section-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 25px;
        .section-actions {
            span {
                display: flex;
                align-items: center;
                @include item-hover;
            }
        }
    }

    .section-items-container {
        display: flex;
        flex-flow: row wrap;
        margin: 0 -7px;

        &.is-collapsed {
            @media screen and (max-width: 955px) {
                .section-item:nth-child(n+3) {
                    display: none;
                }
            }
            .section-item:nth-child(n+5) {
                display: none;
            }
        }
    }
}
</style>
