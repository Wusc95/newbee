import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      index: 1
    }
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    meta: {
      index: 1
    }
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      index: 2
    },
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue'),
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import('../views/Cart.vue'),
    meta: {
      index: 1
    }
  },
  {
    path: '/user',
    name: 'user',
    component: () => import('../views/User.vue'),
    meta: {
      index: 1
    }
  },
  {
    path: '/category',
    name: 'category',
    component: () => import('../views/Category.vue'),
    meta: {
      index: 1
    }
  },
  {
    path: '/product-list',
    name: 'product-list',
    component: () => import('../views/ProductList.vue'),
    meta: {
      index: 2
    }
  },
]

const router = new VueRouter({
  routes
})

export default router
