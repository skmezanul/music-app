<template lang="pug">
.notice-container
	.notice-inner
		// message
		p {{ message }}

		// remove notice manually
		i.material-icons(@click='removeNotice') close
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  props: [
    'message',
  ],
  created() {
    // remove notice automatically after 4000ms
    setTimeout(() => {
      const notices = this.notices;

      if (notices) {
        this.removeNotice();
      }
    }, 4000);
  },
  methods: {
    // remove notice
    removeNotice() {
      this.$emit("remove");
    }
  },
  computed: {
    ...mapGetters({
      notices: 'getNotices',
    }),
  },
};
</script>

<style lang="scss">
.notice-container {
    @include fixed($top: 0, $right: 0, $bottom: 0, $left: 0, $z-index: 999);
    @include flex($display: flex, $justify: center, $align: center);
    height: 69px;
    background-color: $accent-color;
    .notice-inner {
        @include flex($display: flex, $justify: space-between, $align: center);
        p {
            margin: 0;
            @include font($size: 1.1em, $weight: 300);
        }
        i {
            @include item-hover;
        }
    }
}
</style>
