import request from '@/utils/request'
import qs from 'qs'

export function del(data) {
  return request({
    url:"",
    method: 'post',
    data
  })
}
export function onStatus(id,data) {
    return request({
      url:"/api/user/status/"+id,
      method: 'post',
      data
    })
  }

  export function edit(data) {
    return request({
      url:"/api/user/update",
      method: 'post',
      data
    })
  }

  export function editp(data) {
    return request({
      url:"/api/user/money",
      method: 'post',
      data
    })
  }
export default{
    del, onStatus,edit,editp
}