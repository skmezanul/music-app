<template lang="pug">
.page-container
	// new releases
	ma-section(:title='$t("newreleases")')

		.section-items-container
			ma-item(
        v-for='album in $parent.data.releases.albums.items',
        :key='album.id',
        :type='album.type',
        :primaryid='album.id',
        :image='album.images[0].url',
        :title='album.name',
        :artist='album.artists')
</template>
