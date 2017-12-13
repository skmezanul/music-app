<template lang='pug'>
.view-content(v-if='!$isLoading("data")')
	// related artists
	ma-section(
    :title='`${$t("relatedto")} ${$parent.data.artistInfo.name}`',
    :collapsible='true')

		.section-items-container
			ma-item(
        v-for='(artist, index) in $parent.data.related',
        :key='index',
        :type='artist.type',
        :image='artist.images',
        :title='artist.name',
        :primaryid='artist.id')
</template>
