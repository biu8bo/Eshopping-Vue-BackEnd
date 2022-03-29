import request from '@/utils/request'

export function get(params) {
  return request({
    url: "api/express",
    method: 'get',
    params
  })
}

export function del(id,params) {
    return request({
      url: "api/express/"+id,
      method: 'delete',
      params
    })
  }
  
  export function add(data) {
    return request({
      url: "api/express",
      method: 'post',
      data
    })
  }
    
  export function edit(data) {
    return request({
      url: "api/express",
      method: 'put',
      data
    })
  }
export default{
    del,
    add,
    edit,
    get
}