<template lang="pug">
main.main-container
	// stage
	ma-stage(
		:title='$t("settings")',
		:image='currentUser.images[0].url')

	.page-container
		ma-section(title='Color')
			input(type='text', v-model='setColor')
</template>

<script>
import { mapGetters, mapMutations, mapState } from 'vuex';

export default {
  methods: {
    ...mapMutations({
      setAppSettings: 'SET_APP_SETTINGS',
    }),
  },
  computed: {
    ...mapGetters({
      currentUser: 'getCurrentUser',
    }),
    ...mapState({
      accentColor: state => state.customization.accentColor,
    }),

    setColor: {
      get() {
        return this.accentColor;
      },
      set(value) {
        this.setAppSettings({
          value,
        });
      },
    },
  },
};
</script>
