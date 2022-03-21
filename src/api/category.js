import request from '@/utils/request'


export function getCategory() {
  return request({
    url: 'api/getCategory',
    method: 'get',
  })
}

export function editCategory(data) {
  return request({
    url: 'api/editCategory',
    method: 'post',
    data
  })
}

export function delCategory(data) {
  return request({
    url: 'api/delCategory',
    method: 'post',
    data
  })
}

export function addCategory(data) {
  return request({
    url: 'api/addCategory',
    method: 'post',
    data
  })
}
export default {
    getCategory,
    editCategory,
    delCategory,
    addCategory
}