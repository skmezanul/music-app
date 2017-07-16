<template>
<div class="page-container">

  <section class="page-section tracks">
    <ol class="flex-table">
      <flextable v-for="(track, index) in singles" :key="track.id" :image="track.image" :title="track.title" :subtitle="track.subtitle" :duration="track.duration" :index="index"></flextable>
    </ol>
  </section>

</div>
</template>
<script>
export default {
  data() {
    return this.$store.state.singles
  }
}
</script>
