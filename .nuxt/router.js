import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _45f6bf7c = () => interopDefault(import('..\\pages\\about.vue' /* webpackChunkName: "pages_about" */))
const _a979cec2 = () => interopDefault(import('..\\pages\\blog\\index.vue' /* webpackChunkName: "pages_blog_index" */))
const _b47cb662 = () => interopDefault(import('..\\pages\\contact.vue' /* webpackChunkName: "pages_contact" */))
const _2f563d58 = () => interopDefault(import('..\\pages\\login.vue' /* webpackChunkName: "pages_login" */))
const _2d038837 = () => interopDefault(import('..\\pages\\portfolio.vue' /* webpackChunkName: "pages_portfolio" */))
const _2c096f14 = () => interopDefault(import('..\\pages\\reset-password-finish.vue' /* webpackChunkName: "pages_reset-password-finish" */))
const _3b42d133 = () => interopDefault(import('..\\pages\\reset-password-init.vue' /* webpackChunkName: "pages_reset-password-init" */))
const _3e3633e0 = () => interopDefault(import('..\\pages\\admin\\blog.vue' /* webpackChunkName: "pages_admin_blog" */))
const _32d70a52 = () => interopDefault(import('..\\pages\\admin\\contact.vue' /* webpackChunkName: "pages_admin_contact" */))
const _6c900f74 = () => interopDefault(import('..\\pages\\admin\\dashboard.vue' /* webpackChunkName: "pages_admin_dashboard" */))
const _6b54ce0c = () => interopDefault(import('..\\pages\\admin\\portfolio.vue' /* webpackChunkName: "pages_admin_portfolio" */))
const _55c2b389 = () => interopDefault(import('..\\pages\\admin\\user.vue' /* webpackChunkName: "pages_admin_user" */))
const _ace71152 = () => interopDefault(import('..\\pages\\blog\\_slug.vue' /* webpackChunkName: "pages_blog__slug" */))
const _65ae9a41 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages_index" */))

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/about",
    component: _45f6bf7c,
    name: "about"
  }, {
    path: "/blog",
    component: _a979cec2,
    name: "blog"
  }, {
    path: "/contact",
    component: _b47cb662,
    name: "contact"
  }, {
    path: "/login",
    component: _2f563d58,
    name: "login"
  }, {
    path: "/portfolio",
    component: _2d038837,
    name: "portfolio"
  }, {
    path: "/reset-password-finish",
    component: _2c096f14,
    name: "reset-password-finish"
  }, {
    path: "/reset-password-init",
    component: _3b42d133,
    name: "reset-password-init"
  }, {
    path: "/admin/blog",
    component: _3e3633e0,
    name: "admin-blog"
  }, {
    path: "/admin/contact",
    component: _32d70a52,
    name: "admin-contact"
  }, {
    path: "/admin/dashboard",
    component: _6c900f74,
    name: "admin-dashboard"
  }, {
    path: "/admin/portfolio",
    component: _6b54ce0c,
    name: "admin-portfolio"
  }, {
    path: "/admin/user",
    component: _55c2b389,
    name: "admin-user"
  }, {
    path: "/blog/:slug",
    component: _ace71152,
    name: "blog-slug"
  }, {
    path: "/",
    component: _65ae9a41,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
