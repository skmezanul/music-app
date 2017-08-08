<template lang="pug">
transition(name='fade')
	section.page-section(:class="{ 'is-collapsed' : isCollapsed }")
		.section-header(v-if='title != null')
			h1 {{ title }}
			.section-actions(@click='toggleCollapse', v-if='collapsible != false')
				span(v-if='!isCollapsed')
					| Show Less
					i.material-icons keyboard_arrow_up
				span(v-if='isCollapsed')
					| Show More
					i.material-icons keyboard_arrow_down
		slot
</template>

<script>
export default {
  data() {
    return {
      isCollapsed: true,
    };
  },
  props: [
    'title',
    'collapsible',
  ],
  methods: {
    toggleCollapse() {
      this.isCollapsed = !this.isCollapsed;
    },
  },
};
</script>

<style lang="scss">
.page-section {
    display: flex;
    flex-direction: column;
    margin: 30px 0;

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
