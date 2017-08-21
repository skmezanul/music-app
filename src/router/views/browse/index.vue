<template lang="pug">
main.main-container
	// stage
	ma-stage(:subtitle='$t("browse")', :navigation='navigation', :image='$store.state.currentUser.images[0].url', :title='welcomeMessage')

	// router view
	keep-alive
		router-view
</template>

<script>
export default {
  data() {
    return {
      navigation: [{
        title: this.$t('overview'),
        link: '',
      },
      {
        title: this.$t('charts'),
        link: 'charts',
      },
      {
        title: this.$tc('category', 0),
        link: 'categories',
      },
      {
        title: this.$t('newreleases'),
        link: 'newreleases',
      },
      {
        title: this.$t('discover'),
        link: 'discover',
      },
      ],
    };
  },
  computed: {
    welcomeMessage() {
      const greeting = this.$t('hello');
      const fullName = this.$store.state.currentUser.display_name;
      const firstName = fullName.split(' ')[0];
      return `${greeting} ${firstName}`;
    },
  },
};
</script>
