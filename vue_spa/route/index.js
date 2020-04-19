const fileUpload = () => import(/* webpackChunkName: "chunk-file" */ '../pages/file_upload.vue');
const Apage = () => import(/* webpackChunkName: "chunk-one" */'../pages/a.vue');
const Bpage = () => import(/* webpackChunkName: "chunk-one" */'../pages/b.vue');
const Cpage = () => import(/* webpackChunkName: "chunk-two" */'../pages/c.vue');
const Dpage = () => import(/* webpackChunkName: "chunk-two" */'../pages/d.vue');

export default [
  { path: '/', component: fileUpload },
  { path: '/a', component: Apage },
  { path: '/b', component: Bpage },
  { path: '/c', component: Cpage },
  { path: '/d', component: Dpage },
]