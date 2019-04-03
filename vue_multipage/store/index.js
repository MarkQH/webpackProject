import Vue from 'vue'
import Vuex from 'vuex'
// import createWebsocketPlugin from './plugins/createWebsocketPlugin'
import createLogger from 'vuex/dist/logger'

import home from './modules/home'
import list from './modules/list'

Vue.use(Vuex)

const debug = process.env.production

export default new Vuex.Store({
  state:{},
  actions:{},
  mutations:{},
  modules: {
    list,
    home
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})