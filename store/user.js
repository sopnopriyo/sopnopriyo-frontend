import axios from 'axios';
axios.defaults.baseURL = "http://localhost:3000/api";
const state = () => ({
    userListResponse: null,
});
  
const getters = {};
  
const actions = {
    fetchUsers(context, options) {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + options.token
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
        })
    },
};
  
const mutations = {
    fetchUsers(state, userListResponse) {
        state.userListResponse = userListResponse
    },
};

export default {
  state,
  actions,
  mutations,
  getters
};