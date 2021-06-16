import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// import Vuex Store Methods
import getters from './store/getters.js'
import actions from './store/actions.js'
import mutations from './store/mutations.js'
import state from './store/state.js'


import VuexPersistence from "vuex-persist";

const vuexLocal = new VuexPersistence({
    storage: window.localStorage,
    reducer: (state) => ({
      access_token: state.access_token,
      isUserLogged: state.isUserLogged,
      administrator: state.administrator,
    }),
});



export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  plugins: [vuexLocal.plugin]
})