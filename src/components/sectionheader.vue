<template>
  <div class="section-header">
    <h4 class="section-title">{{title}}</h4>
    <div v-if="showmore === true" class="section-actions" @click="collapsed = !collapsed">show more</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      collapsed: false
    }
  },
  props: [
    'title',
    'showmore'
  ]
}
</script>
