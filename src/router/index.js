import Vue from 'vue'
import VueRouter from 'vue-router'

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

// 导入nprogress加载进度条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import ElementUI from 'element-ui'



const routes = [{
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      title: "欢迎登陆",
    },
    component: () => import('@v/Login.vue'), //登入页面
  },
  {
    path: '/register',
    name: 'register',
    meta: {
      title: "欢迎注册"
    },
    component: () => import('@v/Register.vue'), //注册页面
  },
  {
    path: '/personCenter',
    name: 'personCenter',
    meta: {
      title: "个人中心",
    },
    component: () => import('@v/PersonCenterLayout.vue'), //基本信息
    redirect: '/personBaseInfo',
    children: [{
        path: '/personBaseInfo',
        name: 'personBaseInfo',
        meta: {
          title: "基本信息",
        },
        component: () => import('@v/PersonBaseInfo.vue') //基本信息
      },
      {
        path: '/personAccoutnSetting',
        name: 'personAccoutnSetting',
        meta: {
          title: "安全设置",
        },
        component: () => import('@v/PersonAccoutnSetting.vue') //安全设置
      },
      {
        path: '/personIdentityVerify',
        name: 'personIdentityVerify',
        meta: {
          title: "实名认证",
        },
        component: () => import('@v/PersonIdentityVerify.vue') //实名认证
      },
    ]
  },
  {
    path: '/layout',
    name: 'layout',
    component: () => import('@v/Layout.vue'), //后台导航主题框架
    redirect: '/home',
    children: [{
        path: '/home',
        name: 'home',
        meta: {
          title: "物资捐赠首页",
          autho: 0
        },
        component: () => import('@v/user/Home.vue') //首页
      },
      {
        path: '/goods/donation',
        name: 'goodsDonation',
        meta: {
          title: "物品捐赠",
          autho: 0
        },
        component: () => import('@v/user/GoodsDonation.vue')
      },
      {
        path: '/goods/register',
        name: 'goodsRegistration',
        meta: {
          title: "物品登记",
          autho: 0
        },
        component: () => import('@v/user/GoodsRegitration.vue')
      },
      {
        path: '/goods/record',
        name: 'goodsRecord',
        meta: {
          title: "物品记录",
          autho: 0
        },
        component: () => import('@v/user/GoodsRecord.vue')
      },
      {
        path: '/admin/home',
        name: 'adminHome',
        meta: {
          title: "管理员首页",
          autho: 1
        },
        component: () => import('@v/admin/Home.vue')
      },
      {
        path: '/admin/goods/audit',
        name: 'GoodsAudit',
        meta: {
          title: "物品审核",
          autho: 1
        },
        component: () => import('@v/admin/GoodsAudit.vue')
      },
      {
        path: '/admin/goods/donationInfo',
        name: 'GoodsDonationInfo',
        meta: {
          title: "物品审核",
          autho: 1
        },
        component: () => import('@v/admin/GoodsDonationInfo.vue')
      },
    ]
  }
]

// 创建路由对象
const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})



/// 路由前置守卫
router.beforeEach((to, from, next) => {
  // 开启进度条
  NProgress.start();
  if (to.meta && to.meta.title) {
    document.title = to.meta.title;
  }
  const token = localStorage.getItem("LOCAL_KEY_ACCESS_TOKEN");
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  let type = "";
  if (userInfo != null) {
    type = userInfo.type;
  }

  if (to.path === '/login') {
    if (!token) {
      return next();
    } else {
      if (type == "0") {
        return next({
          path: '/home'
        })
      } else if (type == "1") {
        return next({
          path: '/admin/home'
        })
      }
    }
  } else if (to.path === '/register') {
    if (!token) {
      return next();
    } else {
      if (type == "0") {
        return next({
          path: '/home'
        })
      } else if (type == "1") {
        return next({
          path: '/admin/home'
        })
      }
    }
  } else {
    if (!token) {
      ElementUI.Message.warning({
        message: "请先进行登录",
        duration: 2000,
      })
      return next('/login');
    } else if (to.path == "/personCenter" || to.path == "/personBaseInfo" || to.path == "/personAccoutnSetting" || to.path == "/personIdentityVerify") {
      return next();
    } else {
      console.log("autho:", to.meta.autho)
      if (to.meta.autho != type) {
        ElementUI.Message.warning({
          message: "该账号暂无权限",
          duration: 2500,
        });
        window.localStorage.clear();
        return next('/login');
      }
    }
  }
  // if (to.path === '/register') {
  //   if (!token) {
  //     return next();
  //   } else {
  //     return next({
  //       path: '/home'
  //     })
  //   }
  // }
  return next();
})

// 路由前置守卫
router.afterEach(() => {
  // 关闭进度条
  NProgress.done();
})

export default router