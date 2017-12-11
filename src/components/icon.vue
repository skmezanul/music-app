<template lang='pug'>
i.icon.material-icons(:class='{ "can-hover" : hover }')
  slot
</template>

<script>
export default {
  props: {
    hover: Boolean,
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
