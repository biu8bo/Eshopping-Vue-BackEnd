import request from '@/utils/request'

export function del(id) {
  return request({
    url:"api/delSeckill/"+id,
    method: 'Delete',
  })
}


export function add(data) {
  return request({
    url:"api/addSeckill",
    method: 'post',
    data
  })
}


export function  edit(data) {
  return request({
    url:"api/addSeckill",
    method: 'post',
    data
  })
}

export function  editSeckillTime(data) {
  return request({
    url:"api/editSeckillTime",
    method: 'put',
    data
  })
}

export function  aditSeckillTime(data) {
  return request({
    url:"api/addSeckillTime",
    method: 'put',
    data
  })
}

export default{
    del,
    edit,add,
    editSeckillTime,
    aditSeckillTime
}