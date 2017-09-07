<template lang="pug">
.splash-container
  .splash-inner
    i.material-icons {{ icon }}
    h1(v-if='title') {{ title }}
    h2(v-if='subtitle') {{ subtitle }}
    .button-container
      a.btn.btn-accent(v-if='cta') {{ cta }}
  .background-container(v-if='background')
    img(:src='background', :alt='title')
</template>

<script>
export default {
  data() {
  },
  props: [
    'icon',
    'title',
    'subtitle',
    'background',
    'cta',
  ],
}
</script>

<style lang="scss">
.splash-container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  .splash-inner {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 40%;
    text-align: center;
    transform: translateY(-15%);
    i {
      margin-bottom: 20px;
      font-size: 5em;
    }
    h1 {
      margin-bottom: 15px;
      font-size: 2.5em;
    }
    h2 {
      margin-bottom: 20px;
    }
  }
  .background-container {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: -1;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: auto;
      height: 100%;
      filter: grayscale(100%) contrast(200%);
    }
    &:after {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background-color: rgba($main-bg-color, 0.95);
      content: "";
    }
  }
}
</style>
