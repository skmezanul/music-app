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

<style lang="scss">
.page-section {
    display: flex;
    flex-direction: column;
    margin: 30px 0;

    .biography {
        font-weight: 300;
        line-height: 1.5em;
        color: rgba($white, 0.9);
        font-size: 1.1em;
        margin: 0;
    }

    .section-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 25px;
        .section-actions {
            span {
                display: flex;
                align-items: center;
                @include item-hover;
            }
        }
    }

    .section-items-container {
        display: flex;
        flex-flow: row wrap;
        margin: 0 -7px;

        &.is-collapsed {
            @media screen and (max-width: 955px) {
                .section-item:nth-child(n+3) {
                    display: none;
                }
            }
            .section-item:nth-child(n+5) {
                display: none;
            }
        }
    }
}
</style>
