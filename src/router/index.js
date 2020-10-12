import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 隐藏router错误。
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

import auth from './auth'

function requireAuth(to, from, next) {
  if (!auth.loggedIn()) {
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    })
  } else {
    next()
  }
}

const routes = [
  { path: '/', name: 'Home', beforeEnter: requireAuth, component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue') },
  { path: '/login', name: 'Login', component: () => import(/* webpackChunkName: "login" */ '@/views/auth/Login.vue') },
  // { path: '/about', name: 'About', beforeEnter: requireAuth, component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue') },
  // { path: '/test', name: 'Test', component: () => import(/* webpackChunkName: "test" */ '@/views/Test.vue') },
  { path: '/0', name: 'Home', beforeEnter: requireAuth, component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue') },
  { path: '/1', name: '网元配置', beforeEnter: requireAuth, component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'), children: [
    { path: '0', name: '设备列表', component: () => import(/* webpackChunkName: "home" */ '@/views/Test.vue') },
    { path: '1', name: '站点维护', component: () => import(/* webpackChunkName: "home" */ '@/views/Test.vue') },
    { path: '2', name: 'VIP站点管理', component: () => import(/* webpackChunkName: "home" */ '@/views/Test.vue') },
    { path: '3', name: '站点资产管理', component: () => import(/* webpackChunkName: "home" */ '@/views/Test.vue') },
    { path: '4', name: '电子地图', component: () => import(/* webpackChunkName: "home" */ '@/views/Test.vue') }
  ] },
  { path: '/2', name: '操作维护', beforeEnter: requireAuth, component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'), children: [
    { path: '0', name: '设备监控', component: () => import(/* webpackChunkName: "home" */ '@/views/Test.vue') },
    { path: '1', name: '轮询处理', component: () => import(/* webpackChunkName: "home" */ '@/views/Test.vue') },
    { path: '2', name: '轮询报告', component: () => import(/* webpackChunkName: "home" */ '@/views/Test.vue') },
    { path: '3', name: '上报信息查询', component: () => import(/* webpackChunkName: "home" */ '@/views/Test.vue') },
    { path: '4', name: '人为开关告警查询', component: () => import(/* webpackChunkName: "home" */ '@/views/Test.vue') }
  ] },
  { path: '/3', name: '操作维护', beforeEnter: requireAuth, component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'), children: [
    { path: '0', name: '设备监控', component: () => import(/* webpackChunkName: "home" */ '@/views/Test.vue') },
    { path: '1', name: '轮询处理', component: () => import(/* webpackChunkName: "home" */ '@/views/Test.vue') },
    { path: '2', name: '轮询报告', component: () => import(/* webpackChunkName: "home" */ '@/views/Test.vue') },
    { path: '3', name: '上报信息查询', component: () => import(/* webpackChunkName: "home" */ '@/views/Test.vue') },
    { path: '4', name: '人为开关告警查询', component: () => import(/* webpackChunkName: "home" */ '@/views/Test.vue') }
  ] },
  { path: '/logout', beforeEnter: (to, from, next) => {
    auth.logout()
    next('/login')
  }},
  { path: '*', name: '404', component: () => import(/* webpackChunkName: "404" */ '@/views/error/404.vue') }
  // { path: '*', name: '404', component: () => import(/* webpackChunkName: "404" */ '@/views/error/404.vue') }
]

const router = new VueRouter({
  mode: 'history',
  // base: __dirname,
  routes
})

router.beforeEach((to, from, next) => {
  // if (to.path === from.path) {
  //   next({
  //     path: '/',
  //     query: { redirect: to.fullPath }
  //   })
  // }
  // console.log( from, to)
  next()
})

export default router