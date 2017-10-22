<template lang="pug">
  a.button(:class='type')
    i.material-icons(v-if='icon') {{ icon }}
    | {{ $t(title) }}
</template>

<script>
export default {
  props: [
    'type',
    'icon',
    'title',
  ],
};
</script>

<style lang="scss">
.button-container {
    display: flex;
    align-items: center;
    margin-top: 15px;

    .button-group {
        display: flex;
        overflow: hidden;
        margin-right: 5px;
        border-radius: 5px;

        .button {
            margin: 0;
            border-radius: 0;
        }
    }
}

.button {
    display: inline-flex;
    margin-right: 5px;
    padding: 13px;
    border-radius: 3px;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    font-weight: 700;
    font-size: 0.9em;
    transition: background-color 0.3s, color 0.3s;

    &:hover {
        cursor: pointer;
    }

    &:not(.transparent):not(.overlay) {
        background-color: $light-blue;
        &.accent {
            background-color: $accent-color;
        }
        &:hover {
            background-color: $white;
            color: $black;
        }
    }

    &:not(.overlay) {
      i {
          font-size: 1em;
          line-height: inherit;
      }
    }

    &:not(.icon):not(.overlay) {
        i {
            margin-right: 5px;
        }
    }

    &.overlay {
      @include item-hover;
      position: absolute;
      top: 10px;
      right: 10px;
      display: inline-flex;
      margin-right: 0;
      padding: 3px;
      border-radius: 50%;
      background-color: rgba($black, 0.5);
    }
}
</style>
