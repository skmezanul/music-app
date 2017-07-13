<template>
<div class="page-container similar">
  <section class="page-section">
    <div class="section-header">
      <h1>Similar to Ellie Goulding</h1>
    </div>
    <div class="section-items-container">
      <sectionitem v-for="item in similar" type="artist" :key="item.title" :image="item.image" :title="item.title" :subtitle="item.subtitle">
      </sectionitem>
    </div>
  </section>
</div>
</template>
<script>
export default {
  data() {
    return this.$store.state.similar
  }
}
</script>
