<template lang="pug">
.notice-container
	.notice-inner
		i.icon.material-icons(v-if='!$mq.phone') {{ type }}
		// message
		p {{ message }}

		// remove notice manually
		i.close.material-icons(@click='removeNotice({ action: "remove" })') close
</template>

<script>
import {
  mapMutations
} from 'vuex';

export default {
  props: [
    'type',
    'message',
  ],
  methods: {
    ...mapMutations({
      removeNotice: 'SHOW_NOTICE',
    }),
  },
};
</script>

<style lang="scss">
.notice-container {
    @include absolute($top: 0, $right: 0, $bottom: 0, $left: 0, $z-index: 999);
    @include view-grid-columns;
    display: grid;
    height: 69px;
    background-color: var(--accent-color);
    grid-template-areas: ". content .";
    .notice-inner {
        @include flex($display: flex, $justify: space-between, $align: center);
        @include relative;
        overflow: hidden;
        width: 100%;
        height: 100%;
        grid-area: content;
        @media (min-width: $mobile-breakpoint) {
            padding-left: 120px;
        }
        p {
            @include font($size: 1.2em);
            margin: 0;
        }
        i {
            &.icon {
                position: absolute;
                left: 0;
                color: rgba($white, 0.2);
                font-size: 7em;
            }
            &.close {
                @include item-hover;
            }
        }
    }
}
</style>
