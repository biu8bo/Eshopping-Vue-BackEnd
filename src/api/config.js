import request from '@/utils/request'

  export function del(id) {
    return request({
      url:"/api/yxSystemGroupData/"+id,
      method: 'Delete',
    })
  }

  export function edit(data) {
    return request({
      url:"/api/yxSystemGroupData",
      method: 'PUT',
      data
    })
  }
export default{
    del,edit
}