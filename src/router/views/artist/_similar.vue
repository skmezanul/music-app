<template>
<div class="page-container similar">
  <section class="page-section">
    <div class="section-header">
      <h1>Similar to {{ $store.state.artist.name }}</h1>
    </div>
    <div class="section-items-container">
      <sectionitem v-for="item in $store.state.artist.similar.artist" type="artist" :key="item.name" :image="item.image[3]['#text']" :title="item.name">
      </sectionitem>
    </div>
  </section>
</div>
</template>
