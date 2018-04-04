<template lang='pug'>
.o-view__parent

  // stage
  ma-stage(:title='$t("settings")')

  .o-view__content
    ma-section(:title='$t("accentcolor")')
      .c-colorPicker
        .c-colorPicker__color(
          v-for='color in settings.accentColors',
          :class='{ "is-active" : settings.currentAccentColor === color.hex }',
          :style='{ backgroundColor : color.hex }',
          @click='accentColor = color.hex',
          v-tooltip='{ content: $t(color.name), offset: 5 }')

    ma-section(title='Backend Token')
      input(type='text', v-model='backendToken')
</template>

<script>
import {
  mapGetters,
  mapMutations,
} from 'vuex';

export default {

  methods: {
    ...mapMutations({
      setAppSettings: 'app/SET_APP_SETTINGS',
      setCredentials: 'auth/SET_CREDENTIALS',
    }),
  },

  computed: {
    ...mapGetters({
      settings: 'app/getAppSettings',
      spotifyBackendToken: 'auth/getBackendToken',
    }),

    accentColor: {
      get() {
        return this.settings.currentAccentColor;
      },
      set(value) {
        this.setAppSettings({ currentAccentColor: value });
      },
    },

    backendToken: {
      get() {
        return this.spotifyBackendToken;
      },
      set(value) {
        this.setCredentials({ spotifyBackendToken: value });
      },
    },
  },

};
</script>
