<template>
<div class="page-container">
  <section class="page-section information">
    <div class="section-header">
      <h1>About {{ $store.state.artist.name }}</h1>
    </div>
    <p class="biography">{{ $store.state.artist.bio.content }}</p>
  </section>
</div>
</template>
<script>
 export default {
   data() {
     return this.$store.state.information
   }
 }
 </script>
