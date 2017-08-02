<template>
<main class="main-container">

  <!--Stage-->
  <stage
  type="browse"
  :image="$store.state.currentUser.images[0].url"
  :navigation="navigation"
  :title="welcomeMessage"
  ></stage>

  <!--Router View-->
  <router-view></router-view>

</main>
</template>

<script>
export default {
  data() {
    return {
      navigation: [{
          title: 'Overview',
          link: ''
        },
        {
          title: 'Charts',
          link: 'charts'
        },
        {
          title: 'Genres & Moods',
          link: 'genresandmoods'
        },
        {
          title: 'New Releases',
          link: 'newreleases'
        },
        {
          title: 'Discover',
          link: 'discover'
        }
      ]
    }
  },
  computed: {
    welcomeMessage() {
      var greeting = "Good evening"
      var fullName = this.$store.state.currentUser.display_name
      var firstName = fullName.split(" ")[0]
      return greeting + " " + firstName
    }
  }
}
</script>
