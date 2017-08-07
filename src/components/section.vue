<template>
  <transition name="fade">
    <section class="page-section" :class="{ 'is-collapsed' : isCollapsed }">
      <div v-if="title != null" class="section-header">
        <h1>{{ title }}</h1>
        <div @click="toggleCollapse" v-if="collapsible != false" class="section-actions">
            <span v-if="!isCollapsed">Show Less<i class="material-icons">keyboard_arrow_up</i></span>
            <span v-if="isCollapsed">Show More<i class="material-icons">keyboard_arrow_down</i></span>
        </div>
      </div>
      <slot></slot>
    </section>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      isCollapsed: true,
    };
  },
  props: [
    'title',
    'collapsible',
  ],
  methods: {
    toggleCollapse() {
      this.isCollapsed = !this.isCollapsed;
    },
  },
};
</script>
