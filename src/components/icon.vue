<template>
<span class="c-icon" :class="[{ 'c-icon--hover' : hover,  }, `c-icon--${type}` ]">
  <i class="material-icons">
    <slot></slot>
  </i>
</span>
</template>

<script>
export default {

  props: {
    hover: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: 'normal',
    },
  },

};
</script>
