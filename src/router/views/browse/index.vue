<template lang="pug">
main.main-container
	// stage
	ma-stage(type='browse', :image='$store.state.currentUser.images[0].url', :navigation='navigation', :title='welcomeMessage')
	// router view
	router-view
</template>

<script>
export default {
  data() {
    return {
      navigation: [{
        title: 'Overview',
        link: '',
      },
      {
        title: 'Charts',
        link: 'charts',
      },
      {
        title: 'Genres & Moods',
        link: 'genresandmoods',
      },
      {
        title: 'New Releases',
        link: 'newreleases',
      },
      {
        title: 'Discover',
        link: 'discover',
      },
      ],
    };
  },
  computed: {
    welcomeMessage() {
      const greeting = 'Hello';
      const fullName = this.$store.state.currentUser.display_name;
      const firstName = fullName.split(' ')[0];
      return `${greeting} ${firstName}`;
    },
  },
};
</script>
