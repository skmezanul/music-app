<template lang='pug'>
.view-parent
	// stage
	ma-stage

	.view-content
		ma-section(:title='$t("accentcolor")')
			.color-picker
				.color(
					v-for='color in accentColors',
					:style='{ "background-color" : color.hex }',
					@click='setColor(color.hex)',
					v-tooltip='{ content: $t(color.name), offset: 5 }')
</template>

<script>
import {
  mapGetters,
  mapMutations,
} from 'vuex';

export default {

  data: () => ({
    accentColors: [{
      name: 'red',
      hex: '#f3376f',
    },
    {
      name: 'orange',
      hex: '#e89700',
    },
    {
      name: 'cyan',
      hex: '#00e6e6',
    },
    {
      name: 'green',
      hex: '#1DB954',
    },
    ],
  }),

  created() {
    this.setStage({ title: this.$t('settings') });
  },

  methods: {
    ...mapMutations('app', {
      setAppSettings: 'SET_APP_SETTINGS',
      setStage: 'SET_STAGE',
    }),

    setColor(value) {
      this.setAppSettings({ accentColor: value });
    },
  },

  computed: {
    ...mapGetters('app', {
      settings: 'getAppSettings',
    }),
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
        &:hover {
            transform: scale(1.1);
        }
    }
}
</style>
