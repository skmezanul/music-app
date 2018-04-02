<template>
<a class="c-button" :class="buttonClass">

    <!-- icon -->
    <ma-icon class="c-button__icon" v-if="icon">{{ icon }}</ma-icon>

    <!-- title -->
    <span class="c-button__title">{{ $t(title) }}</span>

</a>
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

  computed: {
    // button modifier class
    buttonClass() {
      const self = this,
        { type } = self;

      return type ? `c-button--${type}` : null;
    },
  },

};
</script>
