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
  //首页轮播图
export function getBanner() {
	return request({
		url: 'api/index/banner',
		method: 'get'
	})
}

export function saveBanner(data) {
	return request({
		url: 'api/data/saveBanner',
		method: 'post',
    data
	})
}

export function saveNotify(params) {
	return request({
		url: 'api/data/setNotify',
		method: 'post',
    params
	})
}
//首页  通知
export function getNotify() {
	return request({
		url: 'api/index/getNotify',
		method: 'get'
	})
}

export default{
    del,edit,
    getBanner,
    saveNotify,
    getNotify
}