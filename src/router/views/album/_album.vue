<template>
<div class="page-container">

  <section class="page-section tracks">
    <ol class="flex-table">
      <flextable
      v-for="(track, index) in $store.state.album.tracks.items"
      :key="track.id"
      :type="track.type" 
      :title="track.name"
      :duration="track.duration_ms"
      :index="index"
      ></flextable>
    </ol>
  </section>

</div>
</template>
