<template lang="pug">
.stage(:class='{ "has-cover" : hasCover, "compact" : isCompact }')

	// background
	.background-container(v-if='image')
		img(
		v-parallax='0.5',
		:src='image',
		:alt='title')

	.stage-inner
		.cover-container.mobile-hidden(
			v-if="hasCover",
			:class='{ "small" : hasSmallCover }')

			img(
				:src='image',
				:alt='title')

		// content
		.stage-container
			h2 {{ subtitle }}
			h1 {{ title }}
			.meta-container.mobile-hidden(v-if='meta')
				a(v-html='formattedMeta')
			.button-container(v-if='hasButtons')
				.button-group
					ma-button(
            type='accent',
            icon='play_circle_filled',
            title='playall')
					ma-button(
            v-if='canFollow',
            icon='add_circle',
            title='follow')
					ma-button(
            type='icon',
            icon='favorite')
				ma-button(
          type='transparent',
          icon='share',
          title='share')

		// navigation
		nav.subnav.mobile-hidden(v-if='navigation')
			ul
				li(v-for='navitem in navigation')
					router-link(:to='$toTarget(navitem.name, $route.params.id)') {{ navitem.title }}
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
  computed: {
    // remove "Cover:" message from meta on playlist
    formattedMeta() {
      const meta = this.meta;
      if (meta) {
        const formattedMeta = meta.split('Cover')[0];
        return formattedMeta;
      }
      return false;
    },

    // check if can follow
    canFollow() {
      const routeName = this.$route.name;
      const canFollow = routeName.includes('artist') || routeName.includes('playlist');
      if (canFollow) {
        return true;
      }
      return false;
    },

    // check if stage has cover
    hasCover() {
      const hasCover = this.$route.meta.cover;
      if (hasCover) {
        return true;
      }
      return false;
    },

    // check if stage has small cover
    hasSmallCover() {
      const routeName = this.$route.name;
      const smallCover = this.hasCover && routeName.includes('user');
      if (smallCover) {
        return true;
      }
      return false;
    },

    // check if stage has buttons
    hasButtons() {
      const hasButtons = this.$route.meta.buttons;
      if (hasButtons) {
        return true;
      }
      return false;
    },

    // check if stage is compact
    isCompact() {
      const isCompact = this.$route.meta.compact;
      if (isCompact) {
        return true;
      }
      return false;
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
        .background-container {
            img {
                filter: saturate(150%) blur(40px);
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
            flex-wrap: wrap;
            align-items: center;
            .subnav {
                flex-basis: 100%;
            }
        }
    }

    .background-container {
        @include position(absolute, 1);
        @include flex-center;
        animation: zoomOut 0.7s 0.2s both;

        img {
            width: 100%;
            filter: saturate(130%);
        }
    }
    &:after {
        @include position(absolute, 1);
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

            &.small {
                min-width: 180px;
                width: 180px;
                height: 180px;
            }

            img {
                width: 100%;
                height: auto;
            }
        }

        .stage-container {
            display: flex;
            flex-direction: column;
            width: inherit;

            h1 {
                margin-left: -3px;
                font-size: 5.5em;
            }

            h2 {
                margin-bottom: 5px;
            }

            .meta-container {
                margin-top: 10px;
                width: 80%;
                a {
                    color: rgba($white, 0.7);
                    font-size: 1.2em;
                    line-height: 1.3em;
                    &:link {
                        font-size: inherit;
                        transition: color 0.3s;
                        &:hover {
                            color: $white;
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
