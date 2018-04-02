<template>
<header class="c-header u-sidebarMargin" :class="{ 'is-scrolled' : scrollPosition > 0 }">
    <div class="c-header__container">

        <!-- navigation -->
        <div class="c-header__inner c-header__inner--left">

            <!-- left arrow -->
            <ma-icon
            class="c-header__navigation c-header__navigation--back"
            :hover="true"
            @click.native="$router.go(-1)"
            >

            keyboard_arrow_left

            </ma-icon>

            <!-- right arrow -->
            <ma-icon
            class="c-header__navigation c-header__navigation--forward"
            :hover="true"
            @click.native="$router.go(1)"
            >

            keyboard_arrow_right

            </ma-icon>

        </div>

        <!-- search -->
        <div class="c-header__inner c-header__inner--middle">
            <div class="c-header__search">

                <!-- search icon -->
                <ma-icon class="c-header__searchIcon">search</ma-icon>

                <!-- search field -->
                <input
                class="c-header__searchField"
                type="text"
                @keyup.enter="doSearch"
                v-model="searchQuery"
                :placeholder="$tc('search', 0)"
                />

            </div>
        </div>

        <div class="c-header__inner c-header__inner--right">

            <!-- github button -->
            <ma-button
            class="c-header__githubLink"
            title="Visit on GitHub"
            href="https://github.com/microeinhundert/music-app"
            target="_blank"
            ></ma-button>

        </div>

    </div>
</header>
</template>

<script>
export default {

  data: () => ({
    searchQuery: '',
    scrollPosition: null,
  }),

  methods: {
    // update scroll position
    updateScroll() {
      this.scrollPosition = window.scrollY;
    },

    // do the search
    doSearch() {
      const self = this,
        query = self.searchQuery;

      if (query.length > 0) {
        self.$router.push({
          name: 'search',
          params: {
            query,
          },
        });
      }
    },
  },

  mounted() {
    // add event listeners
    window.addEventListener('scroll', () => {
      this.updateScroll();
    });
  },

  destroy() {
    // remove event listeners
    window.removeEventListener('scroll');
  },

};
</script>
