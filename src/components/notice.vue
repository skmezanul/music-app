<template lang="pug">
.notice
	.notice-inner
		// message
		p {{ message }}

		// close
		i.material-icons(@click="$emit('remove')") close
</template>

<script>
export default {
  props: [
    'message',
  ],
  methods: {
    closeNotice() {
      this.$store.commit('notice', []);
    },
  },
};
</script>

<style lang="scss">
.notice {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: $accent-color;
    position: fixed;
    height: 69px;
    top: 0;
    left: 0;
    right: 0;
    z-index: 999;
    margin-left: 200px;
    .notice-inner {
        display: flex;
        justify-content: space-between;
        align-items: center;
        p {
            font-size: 1.1em;
            font-weight: 300;
            margin: 0;
        }
        i {
            @include item-hover;
        }
    }
}
</style>
