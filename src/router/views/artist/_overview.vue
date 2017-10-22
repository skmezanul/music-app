<template lang="pug">
.page-container
	// top tracks
	ma-section(
    v-if='$parent.data.toptracks.length > 0',
    :title='$t("toptracks")',
    :collapsible='true')

		ol.list
			ma-list(
        v-for='(track, index) in $parent.data.toptracks',
        :key='track.id',
        :trackid='track.id',
        :type='track.type',
        :image='track.album.images[0].url',
        :album='track.album',
        :explicit='track.explicit',
        :title='track.name',
        :duration='track.duration_ms',
        :index='index')

	// albums
	ma-section(
    v-if='$parent.data.albums.length > 0',
    :title='$tc("album", 0)',
    :collapsible='true')

		.section-items-container
			ma-item(
        v-for='album in $parent.data.albums',
        :key='album.id',
        :type='album.type',
        :primaryid='album.id',
        :secondaryid='album.artists[0].id',
        :image='album.images[0].url',
        :title='album.name',
        :artist='album.artists')

	// singles
	ma-section(
    v-if='$parent.data.singles.length > 0',
    :title='$tc("single", 0)',
    :collapsible='true')

		.section-items-container
			ma-item(
        v-for='single in $parent.data.singles',
        :key='single.id',
        :type='single.type',
        :primaryid='single.id',
        :secondaryid='single.artists[0].id',
        :image='single.images[0].url',
        :title='single.name',
        :artist='single.artists')

	// appears on
	ma-section(
    v-if='$parent.data.appearson.length > 0',
    :title='$t("appearson")',
    :collapsible='true')

		.section-items-container
			ma-item(
        v-for='album in $parent.data.appearson',
        :key='album.id',
        :type='album.type',
        :primaryid='album.id',
        :secondaryid='album.artists[0].id',
        :image='album.images[0].url',
        :title='album.name',
        :artist='album.artists')
</template>
