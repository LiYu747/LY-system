import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home/Home.vue'
import Layout from '../views/Layout.vue'

Vue.use(VueRouter)

const routes = [
  // Home
  {
    path: '/',
    name: 'Layout1',
    component: Layout,
    children: [
      {
        path: '/homes',
        name: 'homes',
        component: Home,
        meta: {
          icon: 'el-icon-s-home' //主页
        }
      },
    ]
  },
  //  用户管理
  {
    path: '/',
    name: 'Layout2',
    component: Layout,
    children: [
      {
        path: '/users',
        name: 'users',
        component: () => import('../views/user/Users.vue'),
        meta: {
          icon: 'el-icon-s-custom',//用户管理
        },
      },
      {
        path: '/users/users',
        name: 'users1',
        component: () => import('../views/user/Userlist'),
        meta: {
          icon: 'el-icon-folder-opened' //用户列表
        }
      },
    ]
  },
  //权限管理
  {
    path: '/',
    name: 'Layout3',
    component: Layout,
    children: [
      {
        path: '/rights',
        name: 'rights',
        component: () => import('../views/rights/Rights.vue'),
        meta: {
          icon: 'el-icon-folder' //权限管理
        }
      },
      {
        path: '/rights/roles',
        name: 'rights1',
        component: () => import('../views/rights/Rolelist.vue'),
        meta: {
          icon: 'el-icon-setting' //角色列表
        }
      },
      {
        path: '/rights/rights',
        name: 'rights2',
        component: () => import('../views/rights/Rightslist.vue'),
        meta: {
          icon: 'el-icon-c-scale-to-original' //权限列表
        }
      },
    ]
  },
  //商品管理
  {
    path: '/',
    name: 'Layout4',
    component: Layout,
    children: [
      {
        path: '/goods',
        name: 'goods',
        component: () => import('../views/goods/Goods.vue'),
        meta: {
          icon: 'el-icon-shopping-bag-2' //商品管理
        }
      },
      {
        path: '/goods/goods',
        name: 'goods1',
        component: () => import('../views/goods/Goodslist.vue'),
        meta: {
          icon:'el-icon-bangzhu' //商品列表
        }
      },
      {
        path: '/goods/params',
        name: 'goods2',
        component: () => import('../views/goods/Classparameters.vue'),
        meta: {
          icon:'el-icon-bell' //分类参数
        }
      },
      {
        path: '/goods/categories',
        name: 'goods3',
        component: () => import('../views/goods/Classgoods.vue'),
        meta: {
          icon:'el-icon-date' //商品分类
        }
      },
    ]
  },
  //订单管理
  {
    path: '/',
    name: 'Layout5',
    component: Layout,
    children: [
      {
        path: '/orders',
        name: 'orders',
        component: () => import('../views/orders/Orders.vue'),
        meta: {
          icon: 'el-icon-s-order' //订单管理
        }
      },
      {
        path: '/orders/orders',
        name: 'orders1',
        component: () => import('../views/orders/Orderslist.vue'),
        meta: {
          icon: 'el-icon-folder-add' //订单列表
        }
      },
    ]
  },
  //数据统计
  {
    path: '/',
    name: 'Layout6',
    component: Layout,
    children: [
      {
        path: '/reports',
        name: 'reports',
        component: () => import('../views/reports/Reports.vue'),
        meta: {
          icon: 'el-icon-message' //数据统计
        }
      },
      {
        path: '/reports/reports',
        name: 'reports1',
        component: () => import('../views/reports/Reportslist.vue'),
        meta: {
          icon: 'el-icon-position' //统计报表
        }
      },
    ]
  },

  {
    path: '/Login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  }

]

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
