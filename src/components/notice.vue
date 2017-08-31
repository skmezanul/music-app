<template lang="pug">
.notice-container
	.notice-inner
		// message
		p {{ message }}

		// remove notice manually
		i.material-icons(@click='removeNotice') close
</template>

<script>
export default {
  props: [
    'message',
  ],
  created() {
    // remove notice automatically after 4000ms
    setInterval(() => {
      if (this.$store.state.notices.length > 0) {
        this.removeNotice();
      };
    }, 4000);
  },
  methods: {
    // remove notice
    removeNotice() {
      this.$emit("remove");
    }
  }
};
</script>

<style lang="scss">
.notice-container {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    z-index: 999;
    display: flex;
    align-items: center;
    justify-content: center;
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
