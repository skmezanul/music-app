<template lang="pug">
.stage(:class="{ 'with-cover' : type === 'album' || type === 'playlist', 'stage-compact': $route.meta.stage === 'compact'}")
	// background
	.stage-background
		img(v-parallax='0.5', :src='image', :alt='title')
	.stage-inner
		.cover-container.mobile-hidden(v-if="type === 'album' || type === 'playlist'")
			img(:src='image', :alt='title')
		// content
		.stage-container
			h2 {{ type }}
			h1 {{ title }}
			.meta-container.mobile-hidden(v-if='meta != null')
				a(v-html='meta')
			.button-container(v-if="type != 'browse'")
				.button-group
					a.btn.btn-accent
						i.material-icons play_circle_filled
						| Play All
					a.btn(v-if="type === 'artist'")
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
};
</script>

<style lang="scss">
.stage {
    display: flex;
    position: relative;
    align-items: flex-end;
    justify-content: center;
    width: 100%;
    transition: margin-top 0.3s;
    will-change: margin-top;
    margin-bottom: 20px;
    margin-top: 0;
    padding-top: 65px;
    min-height: 400px;
    height: 550px;
    overflow: hidden;

    &.stage-compact {
        margin-top: -250px;
        .stage-background {
            img {
                filter: saturate(300%) blur(20px);
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
            will-change: filter;
            filter: saturate(150%);
            transition: filter 0.3s;
            width: 100%;
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
                will-change: font-size;
                transition: font-size 0.3s;
                font-size: 5.5em;
                margin-top: 5px;
                margin-left: -3px;
            }
            .meta-container {
                margin-top: 10px;
                a {
                    line-height: 1.3em;
                    font-size: 1.2em;
                    letter-spacing: 1.7px;
                    color: rgba($white, 0.7);

                    a {
                        font-size: inherit;
                        transition: color 0.3s;
                        &:hover {
                            color: $white;
                        }
                    }
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
                    transition: color 0.3s;
                    color: rgba($white, 0.5);
                    font-weight: 300;
                    font-size: 0.9em;

                    &.router-link-exact-active {
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
                    &:not(.router-link-exact-active):hover {
                        cursor: pointer;
                        color: rgba($white, 0.7);
                    }
                }
            }
        }
    }
}
</style>
