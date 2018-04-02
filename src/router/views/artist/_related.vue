<template lang='pug'>
.o-view__content

	// related artists
	ma-section(
    :title='`${$t("relatedto")} ${parentData.artistInfo.name}`',
    :collapsible='true')

		.c-viewSection__inner
			ma-item(
        v-for='artist in parentData.relatedArtists.artists',
        :key='artist.id',
        :type='artist.type',
        :image='artist.images',
        :title='artist.name',
        :primaryid='artist.id')
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
