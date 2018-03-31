<template lang='pug'>
.view-content

	// related artists
	ma-section(
    :title='`${$t("relatedto")} ${parentData.artistInfo.name}`',
    :collapsible='true')

		.section-items-container
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
