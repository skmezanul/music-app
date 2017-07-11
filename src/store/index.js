import vue from 'vue'
import vuex from 'vuex'
import singles from './singles'
import concerts from './concerts'
import similar from './similar'
import information from './information'

vue.use(vuex)

const store = new vuex.Store({
  strict: true,
  state: {
    singles,
    similar,
    concerts,
    information
  }
});

export default store
