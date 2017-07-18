<template>
<div class="page-container">

  <section class="page-section tracks">
    <ol class="flex-table">
      <flextable :key="$store.state.album.id" :type="$store.state.album.type" :title="$store.state.album.name" :duration="$store.state.album.duration_ms"></flextable>
    </ol>
  </section>

</div>
</template>
