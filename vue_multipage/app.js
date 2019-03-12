'use strict'

import Vue from 'vue'
import App from './app.vue'
import store from './store'

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
    console.log('启动了1')
    console.log(this.components)
    new Vue({
      el: this.el,
      components: this.components,
      store: store,
    })
  }
}
