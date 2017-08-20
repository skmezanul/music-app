<template lang="pug">
.stage(:class="{ 'with-cover' : type == 'album' || type == 'playlist', 'compact': $route.meta.stage == 'compact'}")
	// background
	.stage-background
		img(v-parallax='0.5', :src='image', :alt='title')
	.stage-inner
		.cover-container.mobile-hidden(v-if="type == 'album' || type == 'playlist'")
			img(:src='image', :alt='title')

		// content
		.stage-container
			h2 {{ type }}
			h1 {{ title }}
			.meta-container.mobile-hidden(v-if='meta != null')
				a(v-html='formattedMeta')
			.button-container(v-if="type != 'browse'")
				.button-group
					a.btn.btn-accent
						i.material-icons play_circle_filled
						| Play All
					a.btn(v-if="type == 'artist' || type == 'playlist'")
						i.material-icons add_circle
						| Follow
					a.btn.btn-icon
						i.material-icons favorite
				a.btn.btn-transparent
					i.material-icons share
					| Share

		// navigation
		nav.subnav.mobile-hidden(v-if='navigation != null')
			ul
				li(v-for='navitem in navigation')
					router-link(:to='`/${type}/${$route.params.id}/${navitem.link}`') {{ navitem.title }}
</template>

<script>
export default {
  props: [
    'type',
    'navigation',
    'image',
    'title',
    'meta',
  ],
  computed: {
    formattedMeta() {
      const meta = this.meta;
      const formattedMeta = meta.split('Cover')[0];
      return formattedMeta;
    },
  },
};
</script>

<style lang="scss">
.stage {
    display: flex;
    position: relative;
    align-items: flex-end;
    justify-content: center;
    width: 100%;
    margin-bottom: 20px;
    margin-top: 0;
    padding-top: 65px;
    min-height: 350px;
    height: 550px;
    overflow: hidden;
    transition: height 0.5s;
    will-change: height;

    &.compact {
        height: 350px;
        .stage-background {
            img {
                filter: saturate(200%) blur(20px);
            }
        }
        .stage-inner {
            .stage-container {
                h1 {
                    font-size: 3.5em;
                }
            }
        }
    }

    &.with-cover {
        .stage-inner {
            flex-direction: row;
            align-items: center;
        }
    }

    .stage-background {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        animation: zoomOut 0.7s 0.2s both;
        display: flex;
        align-items: center;
        justify-content: center;

        img {
            filter: saturate(150%);
            width: 100%;
            transition: filter 0.5s;
            will-change: filter;
        }
    }
    &:after {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background: radial-gradient(circle, rgba($main-bg-color, 0), $main-bg-color), linear-gradient(to top, $main-bg-color, rgba($main-bg-color, 0));
        content: "";
    }

    .stage-inner {
        display: flex;
        flex-direction: column;
        z-index: 996;

        .cover-container {
            height: 250px;
            width: 250px;
            min-width: 250px;
            overflow: hidden;
            border-radius: 10px;
            margin-right: 35px;
            box-shadow: $shadow;
            img {
                width: 100%;
                height: auto;
            }
        }

        .stage-container {
            display: flex;
            flex-direction: column;

            h1 {
                font-size: 5.5em;
                margin-top: 5px;
                margin-left: -3px;
                transition: font-size 0.5s;
                will-change: font-size;
            }
            .meta-container {
                margin-top: 10px;
                width: 80%;
                a {
                    line-height: 1.3em;
                    font-size: 1.2em;
                    color: rgba($white, 0.7);
                }
            }
            .button-container {
                margin-top: 15px;
                display: flex;
                align-items: center;

                .button-group {
                    display: flex;
                    margin: 0 5px 10px 0;
                    border-radius: 5px;
                    overflow: hidden;

                    a {
                        border-radius: 0;
                        margin: 0;
                        &:nth-child(3) {
                            border-left: 1px solid $blue;
                        }
                    }
                }
            }
        }
    }
}

nav {
    &.subnav {
        margin-top: 15px;

        ul {
            display: flex;

            li {
                padding: 15px 0;
                margin-right: 50px;
                a {
                    letter-spacing: 2px;
                    text-transform: uppercase;
                    transition: color 0.5s;
                    color: rgba($white, 0.5);
                    font-size: 0.9em;

                    &.active {
                        color: $white;
                        &:after {
                            display: block;
                            position: relative;
                            top: 0.9em;
                            width: 40px;
                            height: 3px;
                            margin: 0 auto;
                            background-color: $accent-color;
                            content: "";
                        }
                    }
                    &:not(.active):hover {
                        cursor: pointer;
                        color: rgba($white, 0.7);
                    }
                }
            }
        }
    }
}
</style>
