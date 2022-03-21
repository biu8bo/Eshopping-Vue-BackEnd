import { login, getInfo, logout } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    user: {},
    roles: [],
    // 第一次加载菜单时用到
    loadMenus: false
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_USER: (state, user) => {
      state.user = user
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_LOAD_MENUS: (state, loadMenus) => {
      state.loadMenus = loadMenus
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const rememberMe = userInfo.rememberMe
      return new Promise((resolve, reject) => {
        login(userInfo.username, userInfo.password, userInfo.code, userInfo.uuid).then(res => {
          res.Data.user.roles = ["logError:detail", "YXSYSTEMGROUPDATA_ALL", "yxSystemStoreStaff:edit", "YXSYSTEMUSERLEVEL_SELECT", "YXSTORECATEGORY_SELECT", "YXSYSTEMGROUPDATA_CREATE", "job:edit", "YXSTORECOMBINATION_DELETE", "YXUSERBILL_ALL", "dict:add", "dept:list", "yxSystemStore:edit", "YXEXPRESS_SELECT", "yxWechatTemplate:add", "YXSTORECOMBINATION_EDIT", "yxStoreProductRule:add", "menu:list", "storage:del", "YxWechatMenu_CREATE", "YXSYSTEMCONFIG_SELECT", "YXSTOREORDER_EDIT", "yxStoreCustomer:add", "cate:list", "YXSTORECOUPON_DELETE", "YXSTORECOUPONISSUE_DELETE", "yxUserRecharge:list", "YXSTORESECKILL_DELETE", "YXSTOREBARGAIN_DELETE", "YXSTOREBARGAIN_EDIT", "YXSTORECOUPONUSER_SELECT", "yxStoreCustomer:list", "dict:edit", "dept:del", "YXSTORECATEGORY_ALL", "YXSTOREPRODUCT_DELETE", "yxSystemStore:add", "YXSTORESECKILL_EDIT", "YxWechatMenu_SELECT", "YXUSEREXTRACT_SELECT", "YXSTORECOMBINATION_SELECT", "YXEXPRESS_DELETE", "YXSTORECATEGORY_DELETE", "yxShippingTemplates:add", "yxSystemStoreStaff:add", "YXARTICLE_SELECT", "storage:list", "YXSTOREPRODUCT_CREATE", "YXSTOREPINK_SELECT", "timing:add", "yxStoreAfterSales:add", "job:add", "YXSYSTEMCONFIG_ALL", "yxStoreProductRelation:list", "YXSTORECOUPON_CREATE", "roles:add", "user:add", "yxUserRecharge:del", "timing:edit", "YXSYSTEMUSERLEVEL_CREATE", "YXUSER_EDIT", "YXWECHATREPLY_ALL", "yxWechatTemplate:list", "roles:edit", "user:edit", "YXSTORECATEGORY_EDIT", "yxStoreAfterSales:list", "YXUSER_SELECT", "dept:edit", "storage:add", "YXUSEREXTRACT_EDIT", "dept:add", "yxStoreCustomer:del", "YXSYSTEMCONFIG_CREATE", "menu:del", "YXSTORECOUPON_EDIT", "dict:del", "YXSTOREPRODUCTREPLY_DELETE", "dict:list", "YXSTORECATEGORY_CREATE", "yxStoreCustomer:edit", "timing:list", "YXSYSTEMGROUPDATA_DELETE", "YXSTOREORDER_SELECT", "YXSYSTEMGROUPDATA_SELECT", "YXSYSTEMUSERTASK_EDIT", "YXSTORESECKILL_SELECT", "yxSystemStore:list", "logError:list", "menu:edit", "YXSTOREBARGAIN_SELECT", "YXSTORECOUPONISSUE_SELECT", "yxWechatTemplate:del", "YXEXPRESS_CREATE", "yxSystemStoreStaff:list", "YXSYSTEMUSERLEVEL_DELETE", "YXSYSTEMUSERLEVEL_EDIT", "user:list", "storage:edit", "roles:del", "admin", "YXUSERBILL_SELECT", "YXSTOREPRODUCT_EDIT", "yxStoreAfterSales:edit", "user:del", "yxStoreAfterSales:del", "YXSTOREPRODUCT_SELECT", "YXARTICLE_ALL", "YXSYSTEMUSERTASK_SELECT", "YXSTORECOUPONISSUE_EDIT", "yxSystemStore:del", "YXSTORECOUPON_SELECT", "yxSystemStoreStaff:del", "yxWechatTemplate:edit", "yxShippingTemplates:del", "log:list", "roles:list", "YXSTOREPRODUCTREPLY_SELECT", "YXEXPRESS_EDIT", "job:del", "menu:add", "YxWechatMenu_ALL", "YXSYSTEMGROUPDATA_EDIT", "yxStoreProductRule:del", "timing:del", "yxAppVersion:list"]
          setToken(res.Data.token, rememberMe)
          commit('SET_TOKEN', res.Data.token)
          setUserInfo(res.Data.user, commit)
          // 第一次加载菜单时用到， 具体见 src 目录下的 permission.js
          commit('SET_LOAD_MENUS', true)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo({ commit }) {
      return new Promise((resolve, reject) => {
        getInfo().then(res => {
           res.Data.roles = ["logError:detail", "YXSYSTEMGROUPDATA_ALL", "yxSystemStoreStaff:edit", "YXSYSTEMUSERLEVEL_SELECT", "YXSTORECATEGORY_SELECT", "YXSYSTEMGROUPDATA_CREATE", "job:edit", "YXSTORECOMBINATION_DELETE", "YXUSERBILL_ALL", "dict:add", "dept:list", "yxSystemStore:edit", "YXEXPRESS_SELECT", "yxWechatTemplate:add", "YXSTORECOMBINATION_EDIT", "yxStoreProductRule:add", "menu:list", "storage:del", "YxWechatMenu_CREATE", "YXSYSTEMCONFIG_SELECT", "YXSTOREORDER_EDIT", "yxStoreCustomer:add", "cate:list", "YXSTORECOUPON_DELETE", "YXSTORECOUPONISSUE_DELETE", "yxUserRecharge:list", "YXSTORESECKILL_DELETE", "YXSTOREBARGAIN_DELETE", "YXSTOREBARGAIN_EDIT", "YXSTORECOUPONUSER_SELECT", "yxStoreCustomer:list", "dict:edit", "dept:del", "YXSTORECATEGORY_ALL", "YXSTOREPRODUCT_DELETE", "yxSystemStore:add", "YXSTORESECKILL_EDIT", "YxWechatMenu_SELECT", "YXUSEREXTRACT_SELECT", "YXSTORECOMBINATION_SELECT", "YXEXPRESS_DELETE", "YXSTORECATEGORY_DELETE", "yxShippingTemplates:add", "yxSystemStoreStaff:add", "YXARTICLE_SELECT", "storage:list", "YXSTOREPRODUCT_CREATE", "YXSTOREPINK_SELECT", "timing:add", "yxStoreAfterSales:add", "job:add", "YXSYSTEMCONFIG_ALL", "yxStoreProductRelation:list", "YXSTORECOUPON_CREATE", "roles:add", "user:add", "yxUserRecharge:del", "timing:edit", "YXSYSTEMUSERLEVEL_CREATE", "YXUSER_EDIT", "YXWECHATREPLY_ALL", "yxWechatTemplate:list", "roles:edit", "user:edit", "YXSTORECATEGORY_EDIT", "yxStoreAfterSales:list", "YXUSER_SELECT", "dept:edit", "storage:add", "YXUSEREXTRACT_EDIT", "dept:add", "yxStoreCustomer:del", "YXSYSTEMCONFIG_CREATE", "menu:del", "YXSTORECOUPON_EDIT", "dict:del", "YXSTOREPRODUCTREPLY_DELETE", "dict:list", "YXSTORECATEGORY_CREATE", "yxStoreCustomer:edit", "timing:list", "YXSYSTEMGROUPDATA_DELETE", "YXSTOREORDER_SELECT", "YXSYSTEMGROUPDATA_SELECT", "YXSYSTEMUSERTASK_EDIT", "YXSTORESECKILL_SELECT", "yxSystemStore:list", "logError:list", "menu:edit", "YXSTOREBARGAIN_SELECT", "YXSTORECOUPONISSUE_SELECT", "yxWechatTemplate:del", "YXEXPRESS_CREATE", "yxSystemStoreStaff:list", "YXSYSTEMUSERLEVEL_DELETE", "YXSYSTEMUSERLEVEL_EDIT", "user:list", "storage:edit", "roles:del", "admin", "YXUSERBILL_SELECT", "YXSTOREPRODUCT_EDIT", "yxStoreAfterSales:edit", "user:del", "yxStoreAfterSales:del", "YXSTOREPRODUCT_SELECT", "YXARTICLE_ALL", "YXSYSTEMUSERTASK_SELECT", "YXSTORECOUPONISSUE_EDIT", "yxSystemStore:del", "YXSTORECOUPON_SELECT", "yxSystemStoreStaff:del", "yxWechatTemplate:edit", "yxShippingTemplates:del", "log:list", "roles:list", "YXSTOREPRODUCTREPLY_SELECT", "YXEXPRESS_EDIT", "job:del", "menu:add", "YxWechatMenu_ALL", "YXSYSTEMGROUPDATA_EDIT", "yxStoreProductRule:del", "timing:del", "yxAppVersion:list"]
          setUserInfo(res.Data, commit)
          resolve(res.Data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 登出
    LogOut({ commit }) {
      return new Promise((resolve, reject) => {
        logout().then(res => {
          logOut(commit)
          resolve()
        }).catch(error => {
          logOut(commit)
          reject(error)
        })
      })
    },

    updateLoadMenus({ commit }) {
      return new Promise((resolve, reject) => {
        commit('SET_LOAD_MENUS', false)
      })
    }
  }
}

export const logOut = (commit) => {
  commit('SET_TOKEN', '')
  commit('SET_ROLES', [])
  removeToken()
}

export const setUserInfo = (res, commit) => {
  // 如果没有任何权限，则赋予一个默认的权限，避免请求死循环
  if (res.roles.length === 0) {
    commit('SET_ROLES', ['ROLE_SYSTEM_DEFAULT'])
  } else {
    commit('SET_ROLES', res.roles)
  }
  commit('SET_USER', res)
}

export default user
