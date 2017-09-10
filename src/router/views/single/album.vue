<template lang="pug">
main.main-container
	// stage
	ma-stage(
    :subtitle='$tc("album", 1)',
    :image='album.images[0].url',
    :title='album.name',
    :meta='`${$t("by")} ${album.artists[0].name}`')

	.page-container
		// tracks
		ma-section

			ol.list
				ma-list(
          v-for='(track, index) in album.tracks.items',
          :key='track.id',
          :type='track.type',
          :title='track.name',
          :trackid='track.id',
          :explicit='track.explicit',
          :duration='track.duration_ms',
          :index='index')
</template>

<script>
export default {
  data() {
    return {
      album: [],
    };
  },
  created() {
    // fetch the data when the view is created and the data is
    // already being observed
    this.$spotify('get', 'album');
  },
};
</script>
