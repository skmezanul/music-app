<template>
<div class="page-container">
  <section class="page-section information">
    <div class="section-header">
      <h1>About Ellie Goulding</h1>
    </div>
    <div class="biography" v-html="information">

      <!--Insert Biography-->

    </div>
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
