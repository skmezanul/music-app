<template lang="pug">
transition(name='fade', appear)
	.splash-container
		.splash-inner
			.image-container
				slot(name='image')
			h1(v-if='title') {{ title }}
			.button-container
				slot(name='button')
</template>

<script>
export default {
  props: [
    'title',
  ],
}
</script>

<style lang="scss">
.splash-container {
    @include flex-center;
    width: 100%;
    height: 100vh;
    background: $main-bg-color url('/static/images/concert_bg.jpg') no-repeat;
    background-size: cover;
    animation: zoomOut 0.7s 0.2s both;
    &:before {
        @include position(absolute, -1);
        background-color: rgba($main-bg-color, 0.8);
        content: "";
    }
    .splash-inner {
        @include flex-center;
        flex-direction: column;
        max-width: 500px;
        width: 100%;
        text-align: center;
        transform: translateY(-15%);
        i {
            margin-bottom: 25px;
            font-size: 5em;
        }
        h1 {
            margin: 40px 0 10px;
            font-weight: 300;
            font-family: 'Roboto', sans-serif;
            line-height: 1.4em;
        }
        .image-container {
            img {
                max-width: 300px;
            }
        }
    }
}
</style>
