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
    setInterval(() => {
      const notices = this.notices;
      if (notices.length > 0) {
        this.removeNotice();
      };
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
    @include position(fixed, 999);
    @include flex-center;
    height: 69px;
    background-color: $accent-color;
    .notice-inner {
        display: flex;
        align-items: center;
        justify-content: space-between;
        p {
            margin: 0;
            font-weight: 300;
            font-size: 1.1em;
        }
        i {
            @include item-hover;
        }
    }
}
</style>
