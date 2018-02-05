import axios from 'axios'

const baseUrl = __CLIENT__ ? '' : 'http://cnodejs.org'

const queryString = (url, json) => {
  const str = Object.keys(json).reduce((result, key) => {
    result += `${key}=${json[key]}&`
    return result
  }, '')
  return `${url}?${str.substr(0, str.length - 1)}`
}

const get = (url, params) => {
  return new Promise((resolve, reject) => {
    axios.get(queryString(`${baseUrl}/api/v1${url}`, params))
      .then(resp => {
        resolve(resp.data)
      }).catch(reject)
  })
}

const post = (url, params) => {
  return new Promise((resolve, reject) => {
    axios.post(`${baseUrl}/api/v1${url}`, params)
      .then(resp => {
        resolve(resp.data)
      }).catch(reject)
  })
}

export {
  get,
  post
}
