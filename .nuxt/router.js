import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _ee14b982 = () => interopDefault(import('../pages/about.vue' /* webpackChunkName: "pages/about" */))
const _006c48e3 = () => interopDefault(import('../pages/blog/index.vue' /* webpackChunkName: "pages/blog/index" */))
const _2496a3d2 = () => interopDefault(import('../pages/contact.vue' /* webpackChunkName: "pages/contact" */))
const _7255211b = () => interopDefault(import('../pages/login.vue' /* webpackChunkName: "pages/login" */))
const _4a94d27a = () => interopDefault(import('../pages/portfolio.vue' /* webpackChunkName: "pages/portfolio" */))
const _fb8f738e = () => interopDefault(import('../pages/reset-password-finish.vue' /* webpackChunkName: "pages/reset-password-finish" */))
const _6b1a63b6 = () => interopDefault(import('../pages/reset-password-init.vue' /* webpackChunkName: "pages/reset-password-init" */))
const _2432bca0 = () => interopDefault(import('../pages/admin/blog.vue' /* webpackChunkName: "pages/admin/blog" */))
const _0cf66cdc = () => interopDefault(import('../pages/admin/contact.vue' /* webpackChunkName: "pages/admin/contact" */))
const _c81a30f4 = () => interopDefault(import('../pages/admin/dashboard.vue' /* webpackChunkName: "pages/admin/dashboard" */))
const _c6deef8c = () => interopDefault(import('../pages/admin/portfolio.vue' /* webpackChunkName: "pages/admin/portfolio" */))
const _3bbf3c49 = () => interopDefault(import('../pages/admin/user.vue' /* webpackChunkName: "pages/admin/user" */))
const _0294b0ca = () => interopDefault(import('../pages/blog/_slug.vue' /* webpackChunkName: "pages/blog/_slug" */))
const _aea503f8 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
      path: "/about",
      component: _ee14b982,
      name: "about"
    }, {
      path: "/blog",
      component: _006c48e3,
      name: "blog"
    }, {
      path: "/contact",
      component: _2496a3d2,
      name: "contact"
    }, {
      path: "/login",
      component: _7255211b,
      name: "login"
    }, {
      path: "/portfolio",
      component: _4a94d27a,
      name: "portfolio"
    }, {
      path: "/reset-password-finish",
      component: _fb8f738e,
      name: "reset-password-finish"
    }, {
      path: "/reset-password-init",
      component: _6b1a63b6,
      name: "reset-password-init"
    }, {
      path: "/admin/blog",
      component: _2432bca0,
      name: "admin-blog"
    }, {
      path: "/admin/contact",
      component: _0cf66cdc,
      name: "admin-contact"
    }, {
      path: "/admin/dashboard",
      component: _c81a30f4,
      name: "admin-dashboard"
    }, {
      path: "/admin/portfolio",
      component: _c6deef8c,
      name: "admin-portfolio"
    }, {
      path: "/admin/user",
      component: _3bbf3c49,
      name: "admin-user"
    }, {
      path: "/blog/:slug",
      component: _0294b0ca,
      name: "blog-slug"
    }, {
      path: "/",
      component: _aea503f8,
      name: "index"
    }],

  fallback: false
}

export function createRouter() {
  return new Router(routerOptions)
}
