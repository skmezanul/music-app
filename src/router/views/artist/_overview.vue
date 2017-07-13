<template>
<!--
<div class="page-container">
  <section class="page-section tracks">
    <div class="section-header">
      <h1>Top Tracks</h1>
    </div>
    <flextable></flextable>
  </section>
  <section class="page-section singles">
    <div class="section-header">
      <h1>Singles</h1>
      <div class="section-actions" @click="collapsed = !collapsed">
        <span v-show="collapsed === true">Show More<i class="material-icons">keyboard_arrow_down</i></span><span v-show="collapsed === false">Show Less<i class="material-icons">keyboard_arrow_up</i></span>
      </div>
    </div>
    <div class="section-items-container" :class="{'is-collapsed' : collapsed }">
      <sectionitem v-for="item in singles" type="album" :key="item.title" :image="item.image" :title="item.title" :subtitle="item.subtitle">
      </sectionitem>
    </div>
  </section>
</div>
-->
<div class="page-container">
  <section class="page-section tracks">
    <div class="section-header">
      <h1>Top Tracks</h1>
    </div>
    <flextable></flextable>
  </section>
  <section class="page-section singles">
    <div class="section-header">
      <h1>Singles</h1>
      <div class="section-actions">
        <span>Show Less<i class="material-icons">keyboard_arrow_up</i></span>
      </div>
    </div>
    <div class="section-items-container">
      <sectionitem v-for="item in singles" type="album" :key="item.title" :image="item.image" :title="item.title" :subtitle="item.subtitle">
      </sectionitem>
    </div>
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
