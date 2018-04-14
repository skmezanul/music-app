<template>
<header class="c-header u-sidebarMargin" :class="{ 'is-scrolled' : scrollPosition > 0 }">
    <div class="c-header__container">

        <!-- navigation -->
        <div class="c-header__inner c-header__inner--left">

            <div class="c-header__navigation">

              <!-- left arrow -->
              <a class="c-header__navigationIcon c-header__navigationIcon--back" @click="$router.back()">

                <ma-icon
                type="large"
                :hover="true"
                >

                keyboard_arrow_left

                </ma-icon>

              </a>

              <!-- right arrow -->
              <a class="c-header__navigationIcon c-header__navigationIcon--forward" @click="$router.forward()">

                <ma-icon
                type="large"
                :hover="true"
                >

                keyboard_arrow_right

                </ma-icon>

              </a>

            </div>

        </div>

        <!-- search -->
        <div class="c-header__inner c-header__inner--middle">
            <div class="c-header__search">

                <!-- search icon -->
                <div class="c-header__searchIcon">
                  <ma-icon>search</ma-icon>
                </div>

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

      if (query) {
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
