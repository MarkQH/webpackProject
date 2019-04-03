'use strict'

import Vue from 'vue'
import App from './app.vue'
import store from './store'
import {install as Axios} from './api/install'

Vue.use(Axios)

export default class {
  constructor (components = {}, el = "#app") {
    this.el = el,
    this.components = {
      App,
      ...components
    }
    this.mount()
  }
  mount () {
    new Vue({
      el: this.el,
      components: this.components,
      store: store,
    })
  }
}
