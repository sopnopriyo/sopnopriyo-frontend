import axios from 'axios';
axios.defaults.baseURL =
  process.env.NODE_ENV === "development"
    ? process.env.DEV_API
    : process.env.PROD_API;

const state = () => ({
    messageListResponse: null,
});
  
const getters = {};
  
const actions = {
    fetchMessages(context, options) {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + options.token
        return new Promise((resolve, reject) => {
            return axios.get('/messages', {
                params: options.pagination
            })
            .then(response => {
                context.commit('fetchMessages', response.data)
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
    fetchMessages(state, messageListResponse) {
        state.messageListResponse = messageListResponse
    },
};

export default {
  state,
  actions,
  mutations,
  getters
};