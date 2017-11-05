<template lang="pug">
.view-content
	// related artists
	ma-section(
    :title='`${$t("relatedto")} ${$parent.data.artistInfo.name}`',
    :collapsible='true')

		.section-items-container
			ma-item(
        v-for='artist in $parent.data.related',
        :type='artist.type',
        :key='artist.id',
        :image='artist.images',
        :title='artist.name',
        :primaryid='artist.id')
</template>
