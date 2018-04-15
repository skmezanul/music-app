<template>
<a class="c-button" :class="buttonClasses">

    <!-- icon -->
    <ma-icon type="small" :hover="true" v-if="icon">{{ icon }}</ma-icon>

    <!-- title -->
    <span class="c-button__title">{{ $t(title) }}</span>

</a>
</template>

<script>
export default {

  props: {
    type: {
      type: String,
      default: 'default',
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
    buttonClasses() {
      const self = this;

      return [`c-button--${self.type}`, { 'has-icon': self.icon }];
    },
  },

};
</script>
