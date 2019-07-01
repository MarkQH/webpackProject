const fileUpload = () => import('../pages/file_upload.vue')
const Bpage = () => import('../pages/b.vue')
const Cpage = () => import('../pages/c.vue')
const Dpage = () => import('../pages/d.vue')

export default [
  { path: '/', component: fileUpload },
  { path: '/b', component: Bpage },
  { path: '/c', component: Cpage },
  { path: '/d', component: Dpage },
]