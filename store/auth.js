import axios from 'axios';
import Cookie from "js-cookie";
axios.defaults.baseURL =
  process.env.NODE_ENV === "development"
    ? process.env.DEV_API
    : process.env.PROD_API;
const state = () => ({
    auth: null,
    authUser: null
});
  
const getters = {};
  
const actions = {
  setAuth(context, credentials) {
      return new Promise((resolve, reject) => {
          return axios.post('/authenticate', {
                  username: credentials.username,
                  password: credentials.password
              })
              .then(response => {
                  const auth = response.data.id_token
                  context.commit('setAuth', auth)
                  Cookie.set("auth", auth);
                  resolve(response);
              })
              .catch(error => {
                  console.log(error);
                  reject(error)
              });
      });
  },
  setAuthUser(context) {
    return new Promise((resolve, reject) => {
      
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.auth

      return axios.get('/account')
          .then(response => {
              context.commit('setAuthUser', response.data);
              resolve(response);
          })
          .catch(error => {
              console.log(error);
              reject(error)
          });
  });
  }
};
  
const mutations = {
  setAuth(state, auth) {
      state.auth = auth
  },
  setAuthUser(state, authUser) {
    state.authUser = authUser
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};