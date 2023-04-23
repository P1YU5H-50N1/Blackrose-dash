import { createStore } from "vuex";
import {
  state as auth_state,
  mutations as auth_mutations,
  getters as auth_getters,
  actions as auth_actions
} from "./modules/auth.js"


const store = createStore({
  state: {
    ...auth_state
  },
  mutations: {
    ...auth_mutations
  },
  getters: {
    ...auth_getters
  },
  actions: {
    ...auth_actions
  }
})

export default store
// import Vue from 'vue'
// import Vuex from 'vuex'

// import modules from './modules'

// Vue.use(Vuex)

// const store = new Vuex.Store({
//   modules,
//   // Enable strict mode in development to get a warning
//   // when mutating state outside of a mutation.
//   // https://vuex.vuejs.org/guide/strict.html
//   strict: process.env.NODE_ENV !== 'production',
// })

// export default store

