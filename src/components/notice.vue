<template>
  <div class="c-notice u-sidebarMargin">
      <div class="c-notice__inner">

          <!-- icon -->
          <ma-icon class="c-notice__icon">{{ type }}</ma-icon>

          <!-- message -->
          <p class="c-notice__message">{{ message }}</p>

          <!-- button to remove notice -->
          <ma-icon class="c-notice__close" :hover="true" @click.native="removeNotice({ action: 'remove' })">close</ma-icon>

      </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';

export default {

  props: {
    type: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },

  methods: {
    ...mapMutations('app', {
      removeNotice: 'SET_NOTICE',
    }),
  },

};
</script>
