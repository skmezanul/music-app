<template lang="pug">
main.main-container
	// stage
	ma-stage(
    :subtitle='$tc("search", 1)',
    :image='search.tracks.items[0].album.images[0].url',
    :title="`${$t('searchfor')} '${$route.params.query}'`")

	.page-container
		// tracks
		ma-section(
      v-if='search.tracks.items.length > 0',
      :title='`${$tc("track", 0)} (${search.tracks.items.length})`',
      :collapsible='true')

			ol.list
				ma-list(
          v-for='(track, index) in search.tracks.items',
          :key='track.id',
          :trackid='track.id',
          :type='track.type',
          :image='track.album.images[0].url',
          :title='track.name',
          :artists='track.artists',
          :album='track.album',
          :explicit='track.explicit',
          :duration='track.duration_ms',
          :index='index')

		// albums
		ma-section(
      v-if='search.albums.items.length > 0',
      :title='`${$tc("album", 0)} (${search.albums.items.length})`',
      :collapsible='true')

			.section-items-container
				ma-item(
          v-for='album in search.albums.items',
          :key='album.id',
          :type='album.type',
          :primaryid='album.id',
          :secondaryid='album.artists[0].id',
          :image='album.images[0].url',
          :title='album.name',
          :artist='album.artists')

		// artists
		ma-section(
      v-if='search.artists.items.length > 0',
      :title='`${$tc("artist", 0)} (${search.artists.items.length})`',
      :collapsible='true')

			.section-items-container
				ma-item(
          v-for='artist in search.artists.items',
          :type='artist.type',
          :key='artist.id',
          :title='artist.name',
          :trackid='artist.id')
</template>

<script>
export default {
  data() {
    return {
      search: [],
    };
  },
  created() {
    // fetch the data when the view is created and the data is
    // already being observed
    this.$spotify('get', 'search');
  },
};
</script>
