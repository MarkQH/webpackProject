import Vue from 'vue';
import VueRouter  from 'vue-router';
import store from './store';
import routes from './route';
import App from './app.vue';
import {install as Axios} from './api/install';
import './assets/less/common.less';

// 注册serviceworker
if('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./service-worker.js')
      .then(() => {
        console.log('SW注册成功了');
      })
      .catch(err => {
        console.log('SW注册失败了');
      })
  })
}

Vue.use(VueRouter)
Vue.use(Axios)

new Vue({
  el: "#app",
  store,
  router: new VueRouter({
    mode: 'history',
    routes,
    scrollBehavior (to, from, savedPosition) {
      if (savedPosition) {
        return savedPosition
      } else {
        return { x: 0, y: 0 }
      }
    }
  }),
  render: h => h(App)
})
