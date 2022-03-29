import request from '@/utils/request'

export function remark(data) {
  return request({
    url: "api/order/remark",
    method: 'post',
    data
  })
}


export function editOrder(data) {
  return request({
    url: "api/order/edit",
    method: 'post',
    data
  })
}


export function deliver(data) {
  return request({
    url: "api/order/deliver",
    method: 'post',
    data
  })
}


export default{
  remark,
  editOrder,
  deliver
}