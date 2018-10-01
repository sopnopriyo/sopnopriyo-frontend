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
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
	},
	{
		path: '/login',
		name: 'login',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import(/* webpackChunkName: "login" */ './views/Login.vue')
	},
	{
		path: '/logout',
		name: 'logout',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import(/* webpackChunkName: "logout" */ './views/Logout.vue')
	},
	{
		path: '/manageuser',
		name: 'manageuser',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import(/* webpackChunkName: "manageuser" */ './views/ManageUser.vue'),
		meta: { requiresAuth: true , adminAuth:true , userAuth : false}
	},
	{
		path: '/manageblog',
		name: 'manageblog',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import(/* webpackChunkName: "manageblog" */ './views/ManageBlog.vue'),
		meta: { requiresAuth: true , adminAuth:true , userAuth : true}
	},
	{
		path: '/managecontact',
		name: 'managecontact',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import(/* webpackChunkName: "managecontact" */ './views/ManageContact.vue'),
		meta: { requiresAuth: true , adminAuth:true , userAuth : false}
	},
	{
		path: '/dashboard',
		name: 'dashboard',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
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