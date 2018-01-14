<template lang='pug'>
.stage(:class='{ "is-large" : $route.meta.stage.large, "has-cover" : $route.meta.stage.cover, "has-image" : stage.image, "has-nav" : stage.navigation }')

	// background
	transition(v-if='stage.image', name='zoom-out', appear)
		.background-container
			img.background-image(
				v-parallax='0.5',
				:src='stage.image',
				:alt='stage.title')

	.stage-container
		.cover-container(
			v-if='$route.meta.stage.cover && !$mq.phone',
			:class='{ "is-small" : $route.meta.stage.cover && $route.name === "user" }')

			img.cover-image(
				:src='stage.image',
				:alt='stage.title')

		// content
		.stage-inner

			.subtitle-container
				h4(v-if='subtitle || stage.subtitle') {{ stage.profile ? `${subtitle || stage.subtitle} ${$t('by')} ` :  subtitle || stage.subtitle }}
					router-link.subtitle-link(
						v-if='stage.profile',
						:to='{ name: stage.profile.type, params: { id: stage.profile.id } }') {{ stage.profile.name || stage.profile.display_name }}
				ma-icon.is-popular(v-if='stage.popularity && stage.popularity > 80') stars
			h1.stage-title(v-if='title || stage.title') {{ title || stage.title }}

			.meta-container(v-if='stage.meta && !$mq.phone')
				p.meta(v-html='formatMeta(stage.meta)')
			.action-container(v-if='stage.buttons')

				// play all
				ma-button(
					v-if='stage.buttons.playall',
					type='accent',
					icon='play_circle_filled',
					title='playall')

				// follow / unfollow
				ma-button(
					v-if='canFollow',
					@click.native='setFollowing',
					v-tooltip='{ content: isFollowing ? $t("unfollow") : null }'
					:icon='isFollowing ? "check" : "add_circle"',
					:title='isFollowing ? "following" : "follow"')

				// save
				ma-button(
					v-if='stage.buttons.save',
					icon='save',
					title='save')

				// edit
				ma-button(
					v-if='canEdit',
					icon='edit',
					title='edit')

				.info-container(v-if='stage.info')
					.info-item(v-for='item in stage.info')
						h4.value {{ item.value }}
						span.subtitle {{ item.subtitle }}

			// navigation
		nav.nav-container(v-if='stage.navigation && !$mq.phone')
			ul
				li(v-for='navitem in stage.navigation')
					router-link(:to='{ name: navitem.routeName, params: { id: $route.params.id }}') {{ navitem.title }}
</template>

<script>
import {
  mapActions,
  mapGetters,
} from 'vuex';

export default {
  data() {
    return {
      isFollowing: false,
    };
  },
  props: {
    title: String,
    subtitle: String,
  },
  updated() {
    this.checkIfFollowing();
  },
  watch: {
    $route() {
      this.checkIfFollowing();
    },
  },
  methods: {
    ...mapActions(['GET_USER']),

    // check if current user is following this artist or user
    checkIfFollowing() {
      const self = this,
        {
          name,
          params,
        } = self.$route;

      if (self.canFollow) {
        self.$spotifyApi({
          method: 'get',
          url: '/me/following/contains',
          params: {
            type: name,
            ids: params.id,
          },
        }).then((res) => {
          const isFollowing = res.data[0];

          if (isFollowing !== false) self.isFollowing = isFollowing;
        });
      }
    },

    // follow or unfollow this artist or user
    setFollowing() {
      const self = this,
        {
          name,
          params,
        } = self.$route,
        isArtist = /artist/.test(name);

      if (params.id && self.canFollow) {
        self.$spotifyApi({
          method: 'put',
          url: '/me/following',
          params: {
            type: isArtist ? 'artist' : 'user',
            ids: params.id,
          },
        });
      }
    },

    // remove 'Cover:' from meta
    formatMeta(value) {
      let meta = value;
      const cover = 'Cover:',
        exp = new RegExp(cover),
        hasCoverMessage = exp.test(meta);

      if (typeof meta === 'string' && hasCoverMessage) [meta] = meta.split(cover);
      return meta;
    },
  },
  computed: {
    ...mapGetters({
      stage: 'getStageContent',
    }),

    // check if show follow button
    canFollow() {
      const self = this,
        exp = /artist|user/,
        {
          params,
          name,
        } = self.$route,
        canFollow = params.id && exp.test(name);

      return canFollow;
    },

    // check if show edit button
    canEdit() {
      const self = this,
        exp = /mylibraryTracks|mylibraryAlbums/,
        {
          name,
        } = self.$route,
        canEdit = exp.test(name);

      return canEdit;
    },
  },
};
</script>

<style lang='scss'>
.stage {
    @include relative;
    @include view-grid-columns;
    display: grid;
    overflow: hidden;
    padding-top: 69px;
    min-height: 350px;
    height: 350px;
    transition: background-color 1s;
    grid-area: stage;
    grid-template-areas: ". content .";

    &:not(.has-image) {
        background-color: var(--accent-color);
        filter: saturate(80%);
    }

    &.has-nav {
        .stage-container {
            .stage-inner {
                .action-container {
                    margin-bottom: 20px;
                }
            }
        }
    }

    &:not(.is-large) {
        .background-container {
            img {
                filter: saturate(150%) blur(40px);
            }
        }
        &:after {
            @include absolute($all: 0, $index: 1);
            background: ease-in-out-sine-gradient(to top, $main-bg-color, rgba($main-bg-color, 0)), radial-gradient(circle, rgba($main-bg-color, 0), $main-bg-color);
            content: "";
        }
    }

    &.is-large {
        height: 550px;
        .stage-container {
            .stage-inner {
                .stage-title {
                    @include font($size: 5.5em);
                }
            }
        }
        &:after {
            @include absolute($all: 0, $index: 1);
            background: ease-in-out-sine-gradient(to top, $main-bg-color, rgba($main-bg-color, 0));
            content: "";
        }
    }

    &.has-cover {
        .stage-container {
            @include flex($align: center, $direction: row, $wrap: wrap);
            .nav-container {
                @include flex($basis: 100%);
            }
        }
    }

    .background-container {
        @include absolute($all: 0, $index: 1);
        @include flex($display: flex, $justify: center, $align: center);

        .background-image {
            size: 100vw 100vh;
            filter: saturate(130%);
            object-fit: cover;
        }
    }

    .stage-container {
        @include flex($display: flex, $direction: column);
        z-index: 996;
        grid-area: content;

        .cover-container {
            overflow: hidden;
            margin-right: 35px;
            max-width: 250px;
            size: 250px;
            border-radius: 10px;
            box-shadow: $shadow;
            &:not(.is-small) {
                @include flex($flex: 1);
            }

            &.is-small {
                min-width: 180px;
                size: 180px;
            }
        }

        .stage-inner {
            @include flex($display: flex, $justify: flex-end, $direction: column, $flex: 4);

            .subtitle-container {
                @include flex($display: flex, $align: center);
                margin-bottom: 5px;

                .subtitle-link {
                    transition: color 0.3s;
                    @include font($color: rgba($white, 0.7));
                    &:hover {
                        color: $white;
                        cursor: pointer;
                    }
                }

                .is-popular {
                    @include font($size: 1.2em, $color: rgba($white, 0.7));
                    margin-left: 5px;
                }
            }

            .stage-title {
                @include font($size: 3.5em, $line: 1.2em);
                transform: translateX(-3px);
								font-family: $secondary-family;
            }

            .action-container {
                @include flex($display: flex, $align: center);
                margin-top: 15px;

                .info-container {
                    @include flex($display: flex);
                    margin-left: auto;
                    .info-item {
                        margin-left: 13px;
                        padding-left: 10px;
                        text-align: right;
                        &:not(:first-child) {
                            border-left: 1px solid rgba($white, 0.2);
                        }
                        .value {
                            @include font($size: 1.2em);
                        }
                        .subtitle {
                            @include font($size: 0.8em, $transform: uppercase, $color: rgba($white, 0.5));
                        }
                    }
                }
            }

            .meta-container {
                margin: 10px 0;
                max-width: 70%;
                .meta {
                    @include font($size: 1.2em, $line: 1.2em, $color: rgba($white, 0.7));
                    margin: 0;
                }
            }
        }
    }
    .nav-container {
        ul {
            @include flex($display: flex);

            li {
                margin-right: 50px;
                padding: 15px 0;
                a {
                    @include font($size: 0.9em, $weight: 600, $spacing: 1.5px, $transform: uppercase, $color: rgba($white, 0.5));
                    transition: color 0.5s;

                    &.exact-active {
                        color: $white;
                        &:after {
                            @include relative;
                            top: 0.7em;
                            display: block;
                            margin: 0 auto;
                            size: 3em 1px;
                            background-color: var(--accent-color);
                            content: "";
                        }
                    }
                    &:not(.active):hover {
                        @include font($color: rgba($white, 0.7));
                        cursor: pointer;
                    }
                }
            }
        }
    }
}
</style>
