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
}, {
  "name": "会员管理", "path": "/member", "hidden": false, "redirect": "noredirect", "component": "Layout", "alwaysShow": true, "meta": { "title": "会员管理", "icon": "peoples", "noCache": true },
  "children": [
    { "name": "Member", "path": "member", "hidden": false, "component": "user/index", "meta": { "title": "会员", "icon": "peoples", "noCache": true } },
    //  { "name": "Bill", "path": "bill", "hidden": false, "component": "user/bill", "meta": { "title": "用户账单", "icon": "list", "noCache": true } },
    { "name": "OnlineMember", "path": "onlinet", "hidden": false, "component": "user/online/indext", "meta": { "title": "在线会员", "icon": "Steve-Jobs", "noCache": true } }
  ]
},
{
  "name": "订单管理", "path": "/order", "hidden": false, "redirect": "noredirect", "component": "Layout", "alwaysShow": true, "meta": { "title": "订单管理", "icon": "lock", "noCache": true },
  "children": [
    { "name": "Order", "path": "order", "hidden": false, "component": "shop/order/index", "meta": { "title": "订单", "icon": "order", "noCache": true } },
    { "name": "Reply", "path": "reply", "hidden": false, "component": "shop/reply/index", "meta": { "title": "评论管理", "icon": "comment", "noCache": true } },
    { "name": "Express", "path": "express", "hidden": false, "component": "shop/express/index", "meta": { "title": "物流快递", "icon": "express", "noCache": true } },
    { "name": "Detail", "path": "detail/:id", "hidden": true, "component": "shop/order/detail", "meta": { "title": "订单详情", "icon": "sqlMonitor", "noCache": true } }
  ]
},
{"name":"营销管理","path":"/activity","hidden":false,"redirect":"noredirect","component":"Layout","alwaysShow":true,"meta":{"title":"营销管理","icon":"yingxiao","noCache":true},
"children":[
  {"name":"SecKillEdit","path":"secKillEdit/:id","hidden":true,"component":"activity/seckill/form","meta":{"title":"秒杀商品修改","icon":"anq","noCache":true}},
  {"name":"Seckill","path":"seckill","hidden":false,"component":"activity/seckill/index","meta":{"title":"秒杀产品","icon":"seckill","noCache":true}},
  {"name":"Seckillconfig","path":"seckillconfig","hidden":false,"component":"activity/seckill/seckill","meta":{"title":"秒杀配置","icon":"configure","noCache":true}},
  {"name":"SecKillAdd","path":"secKillAdd","hidden":true,"component":"activity/seckill/form","meta":{"title":"秒杀商品添加","icon":null,"noCache":true}}]},
]
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
