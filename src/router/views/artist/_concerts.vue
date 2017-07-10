<template>
<div class="page-container">
  <section class="page-section nearyou">
    <div class="section-header">
      <h4>2018</h4>
    </div>
      <eventcard v-for="item in concerts" :key="item.venue" :image="item.image" :month="item.month" :day="item.day" :city="item.city" :country="item.country" :venue="item.venue"></eventcard>
  </section>
</div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return this.$store.state.concerts;
  },
  computed: {
    ...mapGetters({
      singles: 'getConcerts'
    })
  }
}
</script>
