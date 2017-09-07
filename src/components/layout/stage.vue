<template lang="pug">
.stage(:class='{ "has-cover" : hasCover, "compact" : isCompact }')

	// background
	.stage-background(v-if='image')
		img(
    v-parallax='0.5',
    :src='image',
    :alt='title')

	.stage-inner
		.cover-container.mobile-hidden(v-if="hasCover")
			img(
        :src='image',
        :alt='title')

		// content
		.stage-container
			h2 {{ subtitle }}
			h1 {{ title }}
			.meta-container.mobile-hidden(v-if='meta')
				a {{ formattedMeta }}
			.button-container(v-if='hasButtons')
				.button-group
					a.btn.btn-accent
						i.material-icons play_circle_filled
						| {{ $t('playall') }}
					a.btn(v-if='canFollow')
						i.material-icons add_circle
						| {{ $t('follow') }}
					a.btn.btn-icon
						i.material-icons favorite
				a.btn.btn-transparent
					i.material-icons share
					| {{ $t('share') }}

		// navigation
		nav.subnav.mobile-hidden(v-if='navigation')
			ul
				li(v-for='navitem in navigation')
					router-link(:to='toTarget(navitem.name)') {{ navitem.title }}
</template>

<script>
export default {
  props: [
    'subtitle',
    'navigation',
    'image',
    'title',
    'meta',
  ],
  methods: {
    // to target
    toTarget(name) {
      const id = this.$route.params.id;
      const target = {
        name,
        params: {
          id,
        },
      };
      return target;
    },
  },
  computed: {
    // remove "Cover:" message from meta on playlist
    formattedMeta() {
      const meta = this.meta;
      const formattedMeta = meta.split('Cover')[0];
      return formattedMeta;
    },

    // check if can follow
    canFollow() {
      const routeName = this.$route.name;
      const cond = routeName.includes("artist") || routeName.includes("playlist");
      return cond;
    },

    // check if stage has cover
    hasCover() {
      return this.$route.meta.cover;
    },

    // check if stage has buttons
    hasButtons() {
      return this.$route.meta.buttons;
    },

    // check if stage is compact
    isCompact() {
      return this.$route.meta.compact;
    },
  },
};
</script>

<style lang="scss">
.stage {
    position: relative;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    overflow: hidden;
    margin-top: 0;
    margin-bottom: 20px;
    padding-top: 65px;
    min-height: 350px;
    width: 100%;
    height: 550px;

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

    &.has-cover {
        .stage-inner {
            flex-direction: row;
            align-items: center;
        }
    }

    .stage-background {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        animation: zoomOut 0.7s 0.2s both;

        img {
            width: 100%;
            filter: saturate(130%);
        }
    }
    &:after {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background: ease-in-out-sine-gradient(to top, $main-bg-color, rgba($main-bg-color, 0)), radial-gradient(circle, rgba($main-bg-color, 0), $main-bg-color);
        content: "";
    }

    .stage-inner {
        z-index: 996;
        display: flex;
        flex-direction: column;

        .cover-container {
            overflow: hidden;
            margin-right: 35px;
            min-width: 250px;
            width: 250px;
            height: 250px;
            border-radius: 10px;
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
                margin-top: 5px;
                margin-left: -3px;
                font-size: 5.5em;
            }
            .meta-container {
                margin-top: 10px;
                width: 80%;
                a {
                    color: rgba($white, 0.7);
                    font-size: 1.2em;
                    line-height: 1.3em;
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
                margin-right: 50px;
                padding: 15px 0;
                a {
                    color: rgba($white, 0.5);
                    text-transform: uppercase;
                    letter-spacing: 2px;
                    font-size: 0.9em;
                    transition: color 0.5s;

                    &.exact-active {
                        color: $white;
                        &:after {
                            position: relative;
                            top: 0.9em;
                            display: block;
                            margin: 0 auto;
                            width: 40px;
                            height: 3px;
                            background-color: $accent-color;
                            content: "";
                        }
                    }
                    &:not(.active):hover {
                        color: rgba($white, 0.7);
                        cursor: pointer;
                    }
                }
            }
        }
    }
}
</style>
