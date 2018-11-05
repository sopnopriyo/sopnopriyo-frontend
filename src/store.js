import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

axios.defaults.baseURL = process.env.VUE_APP_ROOT_API;

export default new Vuex.Store({
    state: {
        token: localStorage.getItem('access_token') || null,
        authUser: null,
		userList: null,
		postList: null,
		portfolioList: null,
		messageList: null,
    },
    getters: {
        loggedIn(state) {
            return state.token !== null
        },
        authUser(state) {
            return state.authUser
        },
        userList(state) {
            return state.userList
		},
		postList(state) {
			return state.postList
		},
		portfolioList(state) {
			return state.portfolioList;
		},
		messageList(state) {
			return state.messageList;
		}
    },
    mutations: {
        retrieveToken(state, token) {
            state.token = token
        },
        destroyToken(state) {
            state.token = null
        },
        authenticateUser(state, authUser) {
            state.authUser = authUser
        },
        fetchUsers(state, userList) {
            state.userList = userList
		},
		fetchPosts(state, postList) {
			state.postList = postList
		},
		fetchPortfolios(state, portfolioList) {
			state.portfolioList = portfolioList
		},
		fetchMessages(state, messageList) {
			state.messageList = messageList;
		}
    },
    actions: {
        destroyToken(context) {
            return new Promise((resolve, reject) => {
                localStorage.removeItem('access_token')
                context.commit('destroyToken')
                resolve()
            });
        },
        retrieveToken(context, credentials) {
            return new Promise((resolve, reject) => {
                return axios.post('/authenticate', {
                        username: credentials.username,
                        password: credentials.password
                    })
                    .then(response => {
                        const token = response.data.id_token
                        localStorage.setItem('access_token', token)
						context.commit('retrieveToken', token)
						axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
						return axios.get('/account')
					})
					.then(response => {
						context.commit('authenticateUser', response.data)
						resolve()
					})
                    .catch(error => {
                        console.log(error);
                        reject(error)
                    });
            });
        },
        authenticateUser(context) {
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
            return new Promise((resolve, reject) => {
                axios.get('/account')
                    .then(response => {
                        context.commit('authenticateUser', response.data)
                        resolve()
                    })
                    .catch(error => {
                        console.log(error)
                        reject()
                    })
            });
        },
        fetchUsers(context) {
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
            return new Promise((resolve, reject) => {
                return axios.get('/users')
                    .then(response => {
                        context.commit('fetchUsers', response.data)
                        resolve()
                    })
                    .catch(error => {
                        console.log(error)
                        reject()
                    })
            });
		},
		fetchPosts(context) {
			axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
			return new Promise((resolve, reject) => {
				return axios.get('/posts')
				.then(response => {
					context.commit('fetchPosts', response.data)
					resolve()
				})
				.catch(error => {
					console.log(error)
					reject()
				})
			})
		},
		fetchPortfolios(context) {
			axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
			return new Promise((resolve, reject) => {
				return axios.get('/portfolios')
				.then(response => {
					context.commit('fetchPortfolios', response.data)
					resolve()
				})
				.catch(error => {
					console.log(error)
					reject()
				})
			})
		},
		fetchMessages(context) {
			axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
			return new Promise((resolve, reject) => {
				return axios.get('/messages')
				.then(response => {
					context.commit('fetchMessages', response.data)
					resolve()
				})
				.catch(error => {
					console.log(error)
					reject()
				})
			})
		}
    }
});
