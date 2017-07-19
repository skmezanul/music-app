<template>
<div class="page-container">

  <section class="page-section tracks">
    <ol class="flex-table">
      <flextable
      v-for="(track, index) in $store.state.album.tracks.items"
      :key="track.track.id"
      :type="track.track.type"
      :image="track.track.album.images[0].url"
      :title="track.track.name"
      :artist="track.track.artists[0].name"
      :artistID="track.track.artists[0].id"
      :album="track.track.album.name"
      :albumID="track.track.album.id"
      :duration="track.track.duration_ms"
      :index="index"
      ></flextable>
    </ol>
  </section>

</div>
</template>
