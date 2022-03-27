import request from '@/utils/request'

export function del(keys) {
  return request({
    url: 'api/auth/online',
    method: 'post',
    data: keys
  })
}

export function delT(keys) {
  return request({
    url: 'api/auth/online/delete',
    method: 'post',
    data: keys
  })
}

