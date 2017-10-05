<template lang="pug">
main.main-container
  // stage
  ma-stage(
    :title='$t("settings")',
    :image='currentUser.images[0].url')
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters({
      currentUser: 'getCurrentUser',
    }),
  },
};
</script>
