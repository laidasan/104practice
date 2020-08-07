import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    firstName: 'samura',
    lasName: 'Chiu'
  },
  getters: {
    fullName(state) {
      return state.firstName + '' + state.lasName
    }
  },
  mutations: {
    // 全大寫 較好
    CHANGE_NAME(state,payload) {
      // console.log(state)
      // console.log(payload)
      state.firstName = payload
    }
  },
  actions: {
    // CHANGE_NAME(context,payload) {
    // }
    CHANGE_NAME({ commit },payload) {
      commit('CHANGE_NAME',payload)
    }
  }
})
