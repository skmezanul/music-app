<template lang='pug'>
i.icon.material-icons(:class='{ "can-hover" : hover }')
  slot
</template>

<script>
export default {

  props: {
    hover: {
      type: Boolean,
      default: false,
    },
  },

};
</script>

<style lang='scss'>
.icon {
    &.can-hover {
        @include item-hover;
    }
}
</style>
