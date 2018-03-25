<template lang='pug'>
.device-splash
  .splash-inner
    .connect-menu
      img.connect-menu-image(src='/static/images/connect_header.png')
      .connect-menu-item.is-highlighted
        .item-icon
          .screen
          .keyboard
        .item-description
          p.item-title {{ $t("listeningOn") }}
          p.item-subtitle {{ currentPlayback.device.name }}
      .connect-menu-item
        .item-icon
          .screen
          .keyboard
        .item-description
          p.item-title Music App - {{ currentUser.display_name }}
          p.item-subtitle Spotify Connect
        ma-icon.arrow arrow_back
    i18n.message(path='splash.listeningOnAnotherDevice', tag='p')
      span.device-name(place='deviceName') Music App - {{ currentUser.display_name }}
</template>

<script>
import { mapGetters } from 'vuex';

export default {

  computed: {
    ...mapGetters({
      currentUser: 'user/getCurrentUser',
      currentPlayback: 'playback/getCurrentPlayback',
    }),
  },

};
</script>

<style lang='scss'>
.device-splash {
    @include fixed($all: 0, $index: 1000);
    @include flex($display: flex, $align: center, $justify: center);
    background-color: $dark-blue;
    .splash-inner {
        max-width: 350px;
        width: 100%;
        .connect-menu {
            .connect-menu-image {
                max-width: 200px;
                margin: auto auto 3em;
            }

            .connect-menu-item {
                @include flex($display: flex, $align: center);
                @include relative;
                margin-bottom: 2em;

                &.is-highlighted {
                    color: var(--accent-color);
                    .item-icon {
                        .screen {
                            border: 2px solid var(--accent-color);
                        }
                        .keyboard {
                            background-color: var(--accent-color);
                        }
                    }
                }

                .arrow {
                    @include absolute($right: -20px);
                    @include font($size: 2em);
                    animation: arrowAnimation 2s ease-in-out infinite alternate;
                }

                .item-icon {
                    width: 60px;
                    margin-right: 2em;
                    .screen {
                        width: 80%;
                        margin: auto;
                        border-radius: 3px;
                        height: 35px;
                        border: 2px solid $white;
                    }
                    .keyboard {
                        margin-top: 10px;
                        height: 2px;
                        width: 100%;
                        background-color: $white;
                    }
                }

                .item-description {
                    .item-title {
                        font-weight: 600;
                        letter-spacing: 2px;
                        margin: 0;
                    }

                    .item-subtitle {
                        margin: 5px 0 0;
                        opacity: 0.7;
                    }
                }
            }
        }
        .message {
            line-height: 1.5em;
            border-top: 1px solid $border-color;
            padding-top: 20px;
            margin-top: 20px;
            .device-name {
                display: block;
                @include font($size: 1.3em, $weight: 600, $color: var(--accent-color));
                margin: 10px 0;
            }
        }
    }
}

@keyframes arrowAnimation {
    from {
        transform: translateX(0);
    }
    to {
        transform: translateX(-20px);
    }
}
</style>
