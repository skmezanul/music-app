import normalize from 'normalize.css'
import material from 'material-design-lite'
import Vue from 'vue'
import router from './router'
import components from './components'

const app = new Vue({
  el: '#app',
  router,
  data: {
    scrollPosition: null,
    sidenav: false,
    dropdown: false,
    volume: 50,
    playing: false
  },
  methods: {
    updateScroll() {
      this.scrollPosition = window.scrollY
    },
    closeDropdown: function() {
      this.dropdown = false
    }
  },

  mounted() {
    window.addEventListener('scroll', this.updateScroll);
  },
  destroy() {
    window.removeEventListener('scroll', this.updateScroll)
  }
})
