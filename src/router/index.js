import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/',
    redirect: '/home',
    component: () => import('@/layout/index.vue'),
    children: [{
      path: 'home',
      component: () => import('@/views/home/index.vue')
    },
    {
      path: 'mode',
      component: () => import('@/views/mode/index.vue')
    },
    {
      path: 'console/:id',
      name: 'console',
      component: () => import('@/views/train/component/console.vue')
    },
    {
      path: 'database',
      component: () => import('@/views/database/index.vue')
    }, {
      path: 'train',
      redirect: '/train/home',
      component: () => import('@/views/train/index.vue'),
      children: [{
        path: 'home',
        component: () => import('@/views/train/component/home.vue')
      },
      {
        path: 'result',
        component: () => import('@/views/train/component/result.vue')
      }
      ]
    }
    ]
  }
  // {
  //   path: '/login',
  //   component: () => import('@/views/login/index'),
  //   hidden: true
  // },
  //
  // {
  //   path: '/404',
  //   component: () => import('@/views/404'),
  //   hidden: true
  // },

  // {
  //   path: '/',
  //   component: Layout,
  //   redirect: '/home',
  //   children: [{
  //     path: 'home',
  //     name: 'home',
  //     component: () => import('@/views/home/index')
  //   },
  //   {
  //     path: '/detail',
  //     name: 'DetailInfo',
  //     component: () => import('@/views/detailInfo/index.vue'),
  //     meta: {
  //       title: '具体信息',
  //       affix: false
  //     },
  //     hidden: true
  //   }
  //   ]
  // },
  // {
  //   path: '/detector',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'detector',
  //       component: () => import('@/views/detector/index.vue'),
  //       meta: { title: '检测器更新', icon: 'detector' }
  //     }
  //   ]
  // },
  // {
  //   path: '/modeChange',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'mode',
  //       component: () => import('@/views/mode/index.vue'),
  //       meta: { title: '模型选择', icon: 'mode' }
  //     }
  //   ]
  // },
  // {
  //   path: '/ipBlack',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'log',
  //       component: () => import('@/views/ipBlack/index.vue'),
  //       meta: { title: 'IP黑名单', icon: 'ip' }
  //     }
  //   ]
  // },
  //
  // {
  //   path: '/log',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'log',
  //       component: () => import('@/views/log/index.vue'),
  //       meta: { title: '日志记录', icon: 'log' }
  //     }
  //   ]
  // },
  // {
  //   path: '/history',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'history',
  //       component: () => import('@/views/history/index'),
  //       meta: { title: '历史记录', icon: 'history' }
  //       // hidden: true
  //     }
  //   ]
  // },
  //
  // // 404 page must be placed at the end !!!
  // { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history.js', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
