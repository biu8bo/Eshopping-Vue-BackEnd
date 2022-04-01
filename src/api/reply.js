import request from '@/utils/request'


export function del(id) {
  return request({
    url: 'api/productReply/'+id,
    method: 'Delete',
  })
}

export function add() {
    return request({
      url: 'api/getCategory',
      method: 'get',
    })
  }

  export function edit() {
    return request({
      url: 'api/getCategory',
      method: 'get',
    })
  }
    

export default {
    del,
    add,
    edit
}