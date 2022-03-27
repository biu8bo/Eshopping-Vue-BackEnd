import request from '@/utils/request'
import qs from 'qs'

export function del(data) {
  return request({
    url: 'api/product/del',
    method: 'POST',
    data
  })
}

export function onsale (data) {
    return request({
      url: '/api/onsales',
      method: 'POST',
      data
    })
  }
  export function add (data) {
    return request({
      url: '/api/product/add',
      method: 'POST',
      data
    })
  }

  export function edit (data) {
    return request({
      url: '/api/product/edit',
      method: 'POST',
      data
    })
  }

  export function getAttr(id) {
    return request({
      url: '/api/product/rule/'+id,
      method: 'get',
    })
  }
  export function setAttr(id,data) {
    return request({
      url: '/api/product/rule/'+id,
      method: 'post',
      data
    })
  }

  export function isFormatAttr(id,data) {
    return request({
      url: '/api/product/isFormatAttr/'+id,
      method: 'post',
      data
    })
  }
export function recovery (url, params) {
    return request({
      url: url + '?' + qs.stringify(params, { indices: false }),
      method: 'get'
    })
  }
  

export default {
    del,
    onsale,
    recovery,
    edit,
    add,
    getAttr,
    isFormatAttr,
    setAttr
}