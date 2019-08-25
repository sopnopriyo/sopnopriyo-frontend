import axios from 'axios';
axios.defaults.baseURL = "http://localhost:3000/api";
const state = () => ({
    postListResponse: null,
});
  
const getters = {};
  
const actions = {
    fetchPosts(context, options) {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + options.token
        return new Promise((resolve, reject) => {
            return axios.get('/posts', {
                params: options.pagination
            })
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
};
  
const mutations = {
    fetchPosts(state, postListResponse) {
        state.postListResponse = postListResponse
    },
};

export default {
  state,
  actions,
  mutations,
  getters
};