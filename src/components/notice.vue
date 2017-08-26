<template lang="pug">
.notice
	.notice-inner
		// message
		p {{ message }}

		// close
		i.material-icons(@click='$emit("remove")') close
</template>

<script>
export default {
  props: [
    'message',
  ],
  created() {
    setInterval(() => {
      this.$emit("remove");
    }, 4000);
  }
};
</script>

<style lang="scss">
.notice {
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
