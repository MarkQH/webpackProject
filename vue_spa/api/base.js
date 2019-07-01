import axios from './config'
import qs from 'qs'

export const post = (url, data, extend = {isJson: true, cache: false}) => {
  let defaultConfig = {
    url,
    method: 'POST',
    data: extend.isJson ? data : qs.stringify(data)
  }
  let config = {...defaultConfig, ...extend}
  return axios(config)
}

export const get = (url, data, extend = {cache: false}) => {
  let defaultConfig = {
    url,
    method: 'GET',
    params: data
  }
  let config = {...defaultConfig, ...extend}
  return axios(config)
}

export const file_upload = (url, formData, onUpload, onDownload, extend = {cache: false}) => {
  let defaultConfig = {
    url,
    method: 'POST',
    data: formData,
    headers: {'Content-Type': 'multipart/form-data;charset=utf-8'},
    onUploadProgress: function(e) {
      let process = ((e.loaded / e.total) *100).toFixed(2);
      onUpload(process);
    }
  }
  let config = {...defaultConfig, ...extend}
  return axios(config)
}
