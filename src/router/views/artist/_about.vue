<template lang='pug'>
.view-content

  // about this artist
  ma-section(:title='`${$t("about")} ${parentData.artistInfo.name}`')
    p.biography(v-html='parentData.additionalInfo.bio')
</template>

<script>
export default {

  props: {
    parentData: {
      type: Object,
      required: true,
    },
  },

};
</script>
