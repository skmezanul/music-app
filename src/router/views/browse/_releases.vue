<template lang='pug'>
.view-content(v-if='!$isLoading("data")')
	// new releases
	ma-section(:title='$t("newreleases")')

		.section-items-container
			ma-item(
        v-for='(album, index) in $parent.data.releases.albums.items',
        :key='album.id',
        :type='album.type',
        :primaryid='album.id',
        :image='album.images',
        :title='album.name',
        :artists='album.artists')
</template>
