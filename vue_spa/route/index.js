const Apage = () => import('../pages/a.vue')
const Bpage = () => import('../pages/b.vue')
const Cpage = () => import('../pages/c.vue')
const Dpage = () => import('../pages/d.vue')

export default [
  { path: '/', component: Apage },
  { path: '/b', component: Bpage },
  { path: '/c', component: Cpage },
  { path: '/d', component: Dpage },
]