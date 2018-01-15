<template lang='pug'>
.view-content(v-if='!$isLoading("data")')
	// top tracks
	ma-section(
    v-if='$parent.data.toptracks.length > 0',
    :title='$t("toptracks")',
    :collapsible='true')

		ol.list
			ma-list(
        v-for='(track, index) in $parent.data.toptracks',
        :key='track.id',
        :trackId='track.id',
        :type='track.type',
        :image='track.album.images',
        :title='track.name',
        :album='track.album',
        :explicit='track.explicit',
        :popularity='track.popularity',
        :duration='track.duration_ms',
        :index='index')

	// albums
	ma-section(
    v-if='$parent.data.albums.length > 0',
    :title='$tc("album", 0)',
    :collapsible='true')

		.section-items-container
			ma-item(
        v-for='(album, index) in $parent.data.albums',
        :key='album.id',
        :type='album.type',
        :primaryid='album.id',
        :secondaryid='album.artists[0].id',
        :image='album.images',
        :title='album.name',
        :artists='album.artists')

	// singles
	ma-section(
    v-if='$parent.data.singles.length > 0',
    :title='$tc("single", 0)',
    :collapsible='true')

		.section-items-container
			ma-item(
        v-for='(single, index) in $parent.data.singles',
        :key='single.id',
        :type='single.type',
        :primaryid='single.id',
        :secondaryid='single.artists[0].id',
        :image='single.images',
        :title='single.name',
        :artists='single.artists')

	// appears on
	ma-section(
    v-if='$parent.data.appearson.length > 0',
    :title='$t("appearson")',
    :collapsible='true')

		.section-items-container
			ma-item(
        v-for='(album, index) in $parent.data.appearson',
        :key='album.id',
        :type='album.type',
        :primaryid='album.id',
        :secondaryid='album.artists[0].id',
        :image='album.images',
        :title='album.name',
        :artists='album.artists')
</template>
