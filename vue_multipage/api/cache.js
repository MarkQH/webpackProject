export default class Cache {
  constructor(axios, config = {}) {
    this.axios = axios
    this.cache = []
    if (!this.axios) {
      throw new Error('have no import axios yer')
    }
    this.config = config
    this.defaultConfig = {
      cache: false,
      expire: 100 * 1000
    }
    this.CancelToken = this.axios.CancelToken
    this.init()
  }

  init() {
    this.requestInterceptor(this.config.requestInterceptorFn)
    this.responseInterceptor(this.config.responseInterceptorFn)
    if(window) {
      window.onbeforeunload = () => {
        this.mapStorage()
      }
    }
  }

  requestInterceptor(callback) {
    this.axios.interceptors.request.use(async config => {
      let newConfig = callback && (await callback(config))
      config = newConfig || config
      let { url, data, params, cacheMode, cache = this.defaultConfig.cache, expire = this.defaultConfig.expire } = config
      if (cache === true) {
        let getKey = data ? `${url}?cacheParams=${data}` : `${url}?cacheParams=${params}`
        let obj = this.getStorage(cacheMode, getKey)
        // 判断缓存数据是否存在
        if (obj) {
          let curTime = this.getExpireTime()
          let source = this.CancelToken.source()
          config.cancelToken = source.token
          // 判断缓存数据是否存在，存在的话是否过期，如果没过期就停止请求返回缓存
          if (curTime - obj.expire < expire) {
            source.cancel(obj)
          } else {
            this.removeStorage(cacheMode, url)
          }
        }
    } else {
      this.clearStorage(url)
    }
    return config
    }, error => {
      return Promise.reject(error)
    })
  }

  responseInterceptor(callback) {
    this.axios.interceptors.response.use(async response => {
      let newResponse = callback && (await callback(response))
      response = newResponse || response
      if(response.status !== 200 || response.data.ret || !response.data.success) {
        return response.data
      }
      let { url, cache, cacheMode, data, params } = response.config
      if(cache === true) {
        let obj = {
          expire: this.getExpireTime(),
          params,
          data,
          result: response.data
        }
        let setKey = data ? `${url}?cacheParams=${data}` : `${url}?cacheParms=${params}`
        this.caches.push(setKey)
        this.setStorage(cacheMode, setKey, obj)
      }
      return response.data
    }, error => {
      if(this.axios.isCancel(error)) {
        return Promise.resolve(error.message.result)
      }
      return Promise.reject(error)
    })
  }

  //设置缓存
  setStorage(mode = `sessionStorage`, key, cache) {
    window[mode].setItem(key, JSON.stringify(cache))
  }

  //获取缓存
  getStorage(mode = `sessionStorage`, key) {
    let data = window[mode].getItem(key)
    return JSON.parse(data)
  }

  //清楚缓存
  removeStorage(mode = `sessionStorage`, key) {
    window[mode].removeStorage(key)
  }

  //设置过期时间
  getExpireTime() {
    return new Date().getTime()
  }

  //清空缓存
  clearStorage(key) {
    if(window.localStorage.getItem(key)) {
      window.localStorage.removeItem(key)
    } else {
      window.sessionStorage.removeItem(key)
    }
  }

  //清空没用到的缓存
  mapStorage() {
    let length = window.localStorage.length
    if(length) {
      for (let i = 0; i < length; i++) {
        let key = window.localStorage.key(i)
        if (!this.caches.includes(key) && key.includes(`?cacheParams=`)) {
          window.localStorage.removeItem(key)
        }
      }
    }
  }
}