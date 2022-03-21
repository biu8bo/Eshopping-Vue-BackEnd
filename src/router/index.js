import router from './routers'
import store from '@/store'
import Config from '@/settings'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'// progress bar style
import { getToken } from '@/utils/auth' // getToken from cookie
import { filterAsyncRouter } from '@/store/modules/permission'

NProgress.configure({ showSpinner: false })// NProgress Configuration
const routerConfig = [{
  "name": "商品管理",
  "path": "/shop",
  "hidden": false,
  "redirect": "noredirect",
  "component": "Layout",
  "alwaysShow": true,
  "meta": { "title": "商品管理", "icon": "shop", "noCache": false },
  "children": [
    {
      "name": "GoodsAdd",
      "path": "goodsAdd",
      "hidden": true,
      "component": "shop/goods/form",
      "meta": { "title": "商品新增", "icon": "anq", "noCache": true }
    },
    {
      "name": "GoodsEdit",
      "path": "goodsEdit/:id",
      "hidden": true,
      "component": "shop/goods/form",
      "meta": { "title": "商品修改", "icon": "anq", "noCache": true }
    },
    {
      "name": "Cate", "path": "cate", "hidden": false,
      "component": "shop/cate/index",
      "meta": { "title": "商品分类", "icon": "icon", "noCache": true }
    },
    {
      "name": "Goods",
      "path": "goods",
      "hidden": false,
      "component": "shop/goods/tab",
      "meta": {
        "title": "管理商品",
        "icon": "develop",
        "noCache": false
      }
    },
    {
      "name": "ProductRule",
      "path": "productRule",
      "hidden": false,
      "component": "shop/storeProductRule/index",
      "meta": { "title": "商品规格", "icon": "mnt", "noCache": true }
    },
    {
      "name": "Viewlog",
      "path": "viewlog",
      "hidden": false,
      "component": "monitor/log/mlog",
      "meta": { "title": "浏览记录", "icon": "log", "noCache": true }
    },
    {
      "name": "ProductRelation",
      "path": "productRelation",
      "hidden": false,
      "component": "shop/collect/index",
      "meta": {
        "title": "商品收藏",
        "icon": "icon",
        "noCache": true
      }
    }, {
      "name": "FootRelation",
      "path": "footRelation",
      "hidden": false,
      "component": "shop/foot/index",
      "meta": {
        "title": "用户足迹",
        "icon": "list",
        "noCache": true
      }
    }]
}]
const whiteList = ['/login']// no redirect whitelist


router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title + ' - ' + Config.title
  }
  NProgress.start()
  if (getToken()) {
    // 已登录且要跳转的页面是登录页
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      if (store.getters.roles.length === 0) { // 判断当前用户是否已拉取完user_info信息
        store.dispatch('GetInfo').then(res => { // 拉取user_info
          // 动态路由，拉取菜单
          loadMenus(next, to)
        }).catch((err) => {
          console.log(err)
          store.dispatch('LogOut').then(() => {
            location.reload() // 为了重新实例化vue-router对象 避免bug
          })
        })
        // 登录时未拉取 菜单，在此处拉取
      } else if (store.getters.loadMenus) {
        // 修改成false，防止死循环
        store.dispatch('updateLoadMenus').then(res => { })
        loadMenus(next, to)
      } else {
        next()
      }
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      next()
    } else {
      next(`/login?redirect=${to.path}`) // 否则全部重定向到登录页
      NProgress.done()
    }
  }
})

export const loadMenus = (next, to) => {
  const asyncRouter = filterAsyncRouter(routerConfig)
  asyncRouter.push({ path: '*', redirect: '/404', hidden: true })
  store.dispatch('GenerateRoutes', asyncRouter).then(() => { // 存储路由
    router.addRoutes(asyncRouter) // 动态添加可访问路由表
    next({ ...to, replace: true })
  })
}

router.afterEach(() => {
  NProgress.done() // finish progress bar
})
