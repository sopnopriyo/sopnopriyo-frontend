import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

//axios.defaults.baseURL = 'https://sopnopriyo.herokuapp.com/api'

axios.defaults.baseURL = 'http://localhost:8080/api';
export default new Vuex.Store({
    state: {
        token: localStorage.getItem('access_token') || null
    },
    getters: {
        loggedIn(state) {
            return state.token !== null;
        }
    },
    mutations: {
        retrieveToken(state, token) {
            state.token = token;
        },
        destroyToken(state) {
            state.token = null;
        }
    },
    actions: {
        destroyToken(context) {
            return new Promise((resolve, reject) => {
                localStorage.removeItem('access_token');
                context.commit('destroyToken');
                resolve();
            });
        },
        retrieveToken(context, credentials) {
            return new Promise((resolve, reject) => {
                axios.post('/authenticate', {
                        username: credentials.username,
                        password: credentials.password
                    })
                    .then(response => {
                        const token = response.data.id_token;
                        localStorage.setItem('access_token', token);
                        context.commit('retrieveToken', token);
                        resolve(response);
                    })
                    .catch(error => {
                        console.log(error);
                        reject(error);
                    });
            });
        }
    }
});
