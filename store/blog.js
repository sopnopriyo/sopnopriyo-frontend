import axios from 'axios';
axios.defaults.baseURL =
  process.env.NODE_ENV === "development"
    ? process.env.DEV_API
    : process.env.PROD_API;
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