<template lang="pug">
main.main-container
	// stage
	ma-stage(
    :subtitle='$t("browse")',
    :navigation='navigation',
    :image='$store.state.currentUser.images[0].url',
    :title='welcomeMessage')

	// router view
	router-view
</template>

<script>
export default {
  data() {
    return {
      navigation: [{
        title: this.$t('overview'),
        name: 'browse',
      },
      {
        title: this.$t('charts'),
        name: 'browseCharts',
      },
      {
        title: this.$tc('category', 0),
        name: 'browseCategories',
      },
      {
        title: this.$t('newreleases'),
        name: 'browseReleases',
      },
      {
        title: this.$t('discover'),
        name: 'browseDiscover',
      },
      ],
    };
  },
  computed: {
    welcomeMessage() {
      const that = this;
      const greeting = that.$t('hello');
      const fullName = that.$store.state.currentUser.display_name;
      const firstName = fullName.split(' ')[0];
      return `${greeting} ${firstName}`;
    },
  },
};
</script>
