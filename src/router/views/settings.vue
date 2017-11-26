<template lang="pug">
.view-parent
  // stage
  ma-stage(:title='$t("settings")')

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
import { mapGetters, mapMutations } from 'vuex';

export default {
  data() {
    return {
      accentColors: [{
        name: 'red',
        hex: '#ca2a59',
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
    };
  },
  methods: {
    ...mapMutations({
      setAppSettings: 'SET_APP_SETTINGS',
    }),

    setColor(value) {
      this.setAppSettings({
        setting: 'accentColor',
        value,
      });
    },
  },
  computed: {
    ...mapGetters({
      settings: 'getAppSettings',
    }),
  },
};
</script>

<style lang="scss" scoped>
.color-picker {
  @include flex($display: flex);
  margin: 0 -7px;
  .color {
    height: 70px;
    width: 70px;
    margin: 0 7px;
    border-radius: 5px;
    transition: transform 0.3s;
    &:hover {
      transform: scale(1.1);
    }
  }
}
</style>
