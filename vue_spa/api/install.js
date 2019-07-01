import { get, post, file_upload } from './base'
export const install = function(Vue, config = {}) {
  Vue.prototype.$_get = get
  Vue.prototype.$_post = post
  Vue.prototype.$_file_upload = file_upload
}