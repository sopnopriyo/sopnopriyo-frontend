import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import store from './store'
Vue.use(Router)

const routes = [{
        path: '/',
        name: 'home',
        component: Home,
        meta: {
            title: "Sopnopriyo - Full Stack Developer"
        }
    },
    {
        path: '/blog',
        name: 'blog',
        component: () =>
            import( /* webpackChunkName: "blog" */ './views/Blog.vue'),
        meta: {
            title: "Sopnopriyo - Blog"
        }

    },
    {
        path: '/contact',
        name: 'contact',
        component: () =>
            import( /* webpackChunkName: "contact" */ './views/Contact.vue'),
        meta: {
            title: "Sopnopriyo - Contact"
        }
    },
    {
        path: '/portfolio',
        name: 'portfolio',
        component: () =>
            import( /* webpackChunkName: "about" */ './views/Portfolio.vue'),
        meta: {
            title: "Sopnopriyo - Portfolio"
        }
    },
    {
        path: '/login',
        name: 'login',
        component: () =>
            import( /* webpackChunkName: "login" */ './views/Login.vue'),
        meta: {
            title: "Sopnopriyo - Login"
        }
    },
    {
        path: '/manageuser',
        name: 'manageuser',
        component: () =>
            import( /* webpackChunkName: "manageuser" */ './views/ManageUser.vue'),
        meta: {
            requiresAuth: true,
            adminAuth: true,
            userAuth: false
        }
    },
    {
        path: '/manageblog',
        name: 'manageblog',
        // route level code-splitting
        component: () =>
            import( /* webpackChunkName: "manageblog" */ './views/ManageBlog.vue'),
        meta: {
            requiresAuth: true,
            adminAuth: true,
            userAuth: true
        }
    },
    {
        path: '/manageportfolio',
        name: 'manageportfolio',
        component: () =>
            import( /* webpackChunkName: "manageportfolio" */ './views/ManagePortfolio.vue'),
        meta: {
            requiresAuth: true,
            adminAuth: true,
            userAuth: false
        }
    },
    {
        path: '/viewmessage',
        name: 'viewmessage',
        component: () =>
            import( /* webpackChunkName: "managecontact" */ './views/ManageContact.vue'),
        meta: {
            requiresAuth: true,
            adminAuth: true,
            userAuth: false
        }
    },
    {
        path: '/dashboard',
        name: 'dashboard',
        component: () =>
            import( /* webpackChunkName: "dashboard" */ './views/Dashboard.vue'),
        meta: {
            requiresAuth: true,
            adminAuth: true,
            userAuth: true
        }
    },

];

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: routes
})

router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth) {
        let isLoggedIn = store.getters.loggedIn;
        let authUser = store.getters.authUser;
        if (!isLoggedIn) {
            next({
                name: 'login'
            })
        } else {
            // to check if the user's previous token is valid or not
            if (isLoggedIn && !authUser) {
                store.dispatch('authenticateUser')
                    .then(response => {
                        authUser = store.getters.authUser
                        next()
                    })
                    .catch(error => {
                        console.log(error)
                        store.dispatch('destroyToken')
                        next({
                            name: 'home'
                        })
                    })
            }
            next()
        }
    } else {
		document.title = to.meta.title
        next()
    }
});

export default router;