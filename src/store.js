import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

//axios.defaults.baseURL = 'https://sopnopriyo.herokuapp.com/api'

axios.defaults.baseURL = 'http://localhost:8080/api';
export default new Vuex.Store({
    state: {
        token: localStorage.getItem('access_token') || null,
        authUser: null,
        userList: null,
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
                        const token = response.data.id_token;
                        localStorage.setItem('access_token', token)
                        context.commit('retrieveToken', token)
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
        }
    }
});
