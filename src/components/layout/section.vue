<template>
<section class="c-viewSection" :class="{ 'is-collapsed' : isCollapsed }">

    <!-- section header -->
    <div class="c-viewSection__header" v-if="title">

        <!-- title -->
        <h1 class="c-viewSection__title">{{ title }}</h1>

        <!-- show more/less -->
        <div class="c-viewSection__actions" @click="toggleCollapse" v-if="collapsible">
            <div class="c-viewSection__collapseToggle">
                <span>{{ $t(collapsed ? 'showmore' : 'showless')}}</span>
                <ma-icon class="c-viewSection__collapseToggleIcon">keyboard_arrow_up</ma-icon>
            </div>
        </div>

    </div>

    <!-- section slot -->
    <slot></slot>

    <span class="c-viewSection__copyright" v-if="copyright">{{ copyright }}</span>

</section>
</template>

<script>
export default {

  data: () => ({
    collapsed: false,
  }),

  props: {
    title: {
      type: String,
      default: '',
    },
    collapsible: {
      type: Boolean,
      default: false,
    },
    copyright: {
      type: String,
      default: '',
    },
  },

  methods: {
    // toggle collapse
    toggleCollapse() {
      const self = this;

      if (self.collapsible) self.collapsed = !self.collapsed;
    },
  },

  computed: {
    // check if section is collapsed
    isCollapsed() {
      const self = this,
        isCollapsed = self.collapsible && self.collapsed;

      return isCollapsed;
    },
  },

};
</script>
