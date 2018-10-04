import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

const routes = [
    {
      path: '/',
      name: 'home',
      component: Home
	},
	{
		path: '/blog',
		name: 'blog',
		component: () => import(/* webpackChunkName: "blog" */ './views/Blog.vue')
	},
	{
		path: '/contact',
		name: 'contact',
		component: () => import(/* webpackChunkName: "contact" */ './views/Contact.vue')
	  },
    {
      path: '/about',
      name: 'about',
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
	},
	{
		path: '/login',
		name: 'login',
		component: () => import(/* webpackChunkName: "login" */ './views/Login.vue')
	},
	{
		path: '/logout',
		name: 'logout',
		component: () => import(/* webpackChunkName: "logout" */ './views/Logout.vue')
	},
	{
		path: '/manageuser',
		name: 'manageuser',
		component: () => import(/* webpackChunkName: "manageuser" */ './views/ManageUser.vue'),
		meta: { requiresAuth: true , adminAuth:true , userAuth : false}
	},
	{
		path: '/manageblog',
		name: 'manageblog',
		// route level code-splitting
		component: () => import(/* webpackChunkName: "manageblog" */ './views/ManageBlog.vue'),
		meta: { requiresAuth: true , adminAuth:true , userAuth : true}
	},
	{
		path: '/manageportfolio',
		name: 'manageportfolio',
		component: () => import(/* webpackChunkName: "manageportfolio" */ './views/ManagePortfolio.vue'),
		meta: { requiresAuth: true , adminAuth:true , userAuth : false}
	},
	{
		path: '/managecontact',
		name: 'managecontact',
		component: () => import(/* webpackChunkName: "managecontact" */ './views/ManageContact.vue'),
		meta: { requiresAuth: true , adminAuth:true , userAuth : false}
	},
	{
		path: '/dashboard',
		name: 'dashboard',
		component: () => import(/* webpackChunkName: "dashboard" */ './views/Dashboard.vue'),
		meta: { requiresAuth: true , adminAuth:true , userAuth : true}
	},

];

const router =  new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: routes
})

router.beforeEach((to, from, next) => {
	// if(to.meta.requiresAuth) {
	// 	const authUser = JSON.parse(window.localStorage.getItem('lbUser'))
	// 	if(!authUser || !authUser.token) {
	// 		next({name:'login'})
	//   	}
	//   	else if(to.meta.adminAuth) {
	//   		const authUser = JSON.parse(window.localStorage.getItem('lbUser'))
	//   		if(authUser.data.role_id === 'ADMIN') {
	// 			next()
	// 	  	}
	// 	  	else {
	// 			next('/resident')
	//   		}
	// 	}
	// 	else if(to.meta.userAuth) {
	//   		const authUser = JSON.parse(window.localStorage.getItem('lbUser'))
	// 		if(authUser.data.role_id === 'RESIDENT') {
	// 			next()
	// 		}
	// 		else {
	// 			console.log('Im in admin')
	// 			next('/admin')
	// 		}
	// 	}
	// }
	// else {
		next()
	//}
});

export default router;