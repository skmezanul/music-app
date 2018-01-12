<template lang='pug'>
.notice-container
  .notice-inner
    ma-icon.notice-icon(v-if='!$mq.phone') {{ type }}
    // message
    p {{ message }}

    // remove notice manually
    ma-icon.close-button(:hover='true', @click.native='removeNotice({ action: "remove" })') close
</template>

<script>
import {
  mapMutations,
} from 'vuex';

export default {
  props: {
    type: String,
    message: String,
  },
  methods: {
    ...mapMutations({
      removeNotice: 'SET_NOTICE',
    }),
  },
};
</script>

<style lang='scss'>
.notice-container {
    @include absolute($all: 0, $index: 999);
    @include view-grid-columns;
    display: grid;
    height: 69px;
    background-color: var(--accent-color);
    grid-template-areas: ". content .";
    .notice-inner {
        @include flex($display: flex, $justify: space-between, $align: center);
        @include relative;
        overflow: hidden;
        size: 100%;
        grid-area: content;
        @media (min-width: $mobile-breakpoint) {
            padding-left: 120px;
        }
        p {
            @include font($size: 1.2em);
            margin: 0;
        }
        .notice-icon {
          @include absolute($left: 0);
          @include font($size: 7em, $color: rgba($white, 0.2));
        }
    }
}
</style>
