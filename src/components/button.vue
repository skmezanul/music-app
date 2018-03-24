<template lang='pug'>
a.button(:class='type')
	ma-icon(v-if='icon') {{ icon }}
	span {{ $t(title) }}
</template>

<script>
export default {

  props: {
    type: {
      type: String,
      default: '',
    },
    icon: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
  },

};
</script>

<style lang='scss'>
.button {
    @include flex($display: inline-flex);
    @include font($size: 0.9em, $weight: 600, $transform: uppercase);
    padding: 0.8em 1.3em;
    border-radius: 2em;
    transition: all 0.3s;
    cursor: pointer;

    &:not(.transparent):not(.overlay) {
        border: 2px solid;
        background-color: rgba($white, 0.05);
        border-color: rgba($white, 0.2);
        &.accent {
            background-color: var(--accent-color);
            border-color: var(--accent-color);
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
        margin-right: 1em;
        .icon {
            margin-right: 5px;
        }
    }

    &.overlay {
        @include absolute($top: 10px, $right: 10px);
        @include item-hover;
        padding: 3px;
        border-radius: 50%;
        background-color: rgba($black, 0.5);
    }
}
</style>
