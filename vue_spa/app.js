import Vue from 'vue'
import vuex from 'vuex'
import VueRouter  from 'vue-router'
import store from './store'
import routes from './routes'

Vue.use(vuex);

new Vue({
  el: "#app",
  store: store,
  router: new VueRouter({routes}),
  data: () => {
    return {
      name: '单页vue'
    }
  }
})
