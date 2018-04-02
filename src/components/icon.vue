<template>
<i class="c-icon material-icons" :class="{ 'c-icon--hover' : hover }">
  <slot></slot>
</i>
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
