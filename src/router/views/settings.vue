<template lang='pug'>
.o-view__parent

	// stage
	ma-stage(:title='$t("settings")')

	.o-view__content
		ma-section(:title='$t("accentcolor")')
			.c-colorPicker
				.c-colorPicker__color(
					v-for='color in settings.accentColors',
          :class='{ "is-active" : accentColor.current === color.hex }',
					:style='{ backgroundColor : color.hex }',
					@click='accentColor = color.hex',
					v-tooltip='{ content: $t(color.name), offset: 5 }')
</template>

<script>
import {
  mapGetters,
  mapMutations,
} from 'vuex';

export default {

  methods: {
    ...mapMutations('app', {
      setAppSettings: 'SET_APP_SETTINGS',
    }),
  },

  computed: {
    ...mapGetters('app', {
      settings: 'getAppSettings',
    }),

    accentColor: {
      get() {
        return this.settings.currentAccentColor;
      },
      set(value) {
        this.setAppSettings({ currentAccentColor: value });
      },
    },
  },

};
</script>
