import Vue from 'vue'
import Vuex from 'vuex'
// import createWebsocketPlugin from './plugins/createWebsocketPlugin'
import createLogger from 'vuex/dist/logger'

import aStore from './modules/aStore'
import bStore from './modules/bStore'

Vue.use(Vuex)

const debug = process.env.production

export default new Vuex.Store({
  state:{},
  actions:{},
  mutations:{},
  modules: {
    bStore,
    aStore
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})