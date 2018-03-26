<template lang='pug'>
transition(name='fade')
	.device-splash(v-if='isNotPlaybackDevice')
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
						p.item-title {{ deviceName }}
						p.item-subtitle Spotify Connect
					ma-icon.arrow arrow_back
			i18n.message(path='splash.listeningOnAnotherDevice', tag='p')
				span.device-name(place='deviceName') {{ deviceName }}
</template>

<script>
import { mapGetters } from 'vuex';

export default {

  computed: {
    ...mapGetters({
      currentUser: 'user/getCurrentUser',
      currentPlayback: 'playback/getCurrentPlayback',
      deviceId: 'player/getDeviceId',
    }),

    // check if is current Spotify Connect playback device
    isNotPlaybackDevice() {
      const self = this,
        {
          currentPlayback,
          deviceId
        } = self,
        isNotPlaybackDevice = currentPlayback.device.id !== deviceId;

      return isNotPlaybackDevice;
    },

    // get device name
    deviceName() {
      const self = this,
        {
          currentUser
        } = self,
        deviceName = `Music App - ${currentUser.display_name || currentUser.email}`;

      return deviceName
    },
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
                margin: auto auto 3em;
                max-width: 200px;
            }

            .connect-menu-item {
                @include flex($display: flex, $align: center);
                @include relative;
                margin-bottom: 2em;

                &.is-highlighted {
                    @include font($color: var(--accent-color));
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
                    margin-right: 2em;
                    width: 60px;
                    .screen {
                        margin: auto;
                        width: 80%;
                        height: 35px;
                        border: 2px solid $white;
                        border-radius: 3px;
                    }
                    .keyboard {
                        margin-top: 10px;
                        width: 100%;
                        height: 2px;
                        background-color: $white;
                    }
                }

                .item-description {
                    .item-title {
                        margin: 0;
                        @include font($spacing: 2px, $weight: 600);
                    }

                    .item-subtitle {
                        margin: 5px 0 0;
                        opacity: 0.7;
                    }
                }
            }
        }
        .message {
            margin-top: 20px;
            padding-top: 20px;
            border-top: 1px solid $border-color;
            @include font($line: 1.5em);
            .device-name {
                @include font($size: 1.3em, $weight: 600, $color: var(--accent-color));
                display: block;
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
