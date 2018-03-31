<template lang='pug'>
.view-parent

	// stage
	ma-stage(:title='$t("settings")')

	.view-content
		ma-section(:title='$t("accentcolor")')
			.color-picker
				.color(
					v-for='color in settings.accentColors',
          :class='{ "active" : accentColor.current === color.hex }',
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

<style lang='scss'>
.color-picker {
    display: grid;
    grid-template-columns: repeat(4, 70px);
    grid-column-gap: 1em;
    .color {
        size: 100% 70px;
        border-radius: 5px;
        transition: transform 0.3s;
        border: 3px solid;
        border-color: transparent;
        &:hover {
            transform: scale(1.1);
        }

        &.active {
          border-color: $white;
        }
    }
}
</style>
