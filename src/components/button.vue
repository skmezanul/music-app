<template lang='pug'>
  a.button(:class='type')
    ma-icon(v-if='icon') {{ icon }}
    | {{ $t(title) }}
</template>

<script>
export default {
  props: {
    type: String,
    icon: String,
    title: String,
  },
};
</script>

<style lang='scss'>
.button {
    @include flex($display: inline-flex);
    @include font($size: 0.9em, $weight: 600, $spacing: 1.5px, $transform: uppercase);
    margin-right: 5px;
    padding: 13px;
    border-radius: 5px;
    transition: background-color 0.3s, color 0.3s;

    &:hover {
        cursor: pointer;
    }

    &:not(.transparent):not(.overlay) {
        background-color: $grey;
        &.accent {
            background-color: var(--accent-color);
        }
        &:hover {
            @include font($color: $black);
            background-color: $white;
        }
    }

    &:not(.overlay) {
      .icon {
          @include font($size: 1em, $line: inherit);
      }
    }

    &:not(.icon):not(.overlay) {
        .icon {
            margin-right: 5px;
        }
    }

    &.overlay {
      @include absolute($top: 10px, $right: 10px);
      @include item-hover;
      @include flex($display: inline-flex);
      margin-right: 0;
      padding: 3px;
      border-radius: 50%;
      background-color: rgba($black, 0.5);
    }
}
</style>
