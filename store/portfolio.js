import axios from 'axios';
axios.defaults.baseURL =
  process.env.NODE_ENV === "development"
    ? process.env.DEV_API
    : process.env.PROD_API;
const state = () => ({
    portfolioListResponse: null,
});
  
const getters = {};
  
const actions = {
    fetchPortfolios(context, options) {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + options.token
        return new Promise((resolve, reject) => {
            return axios.get('/portfolios', {
                params: options.pagination
            })
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
};
  
const mutations = {
    fetchPortfolios(state, portfolioListResponse) {
        state.portfolioListResponse = portfolioListResponse
    },
};

export default {
  state,
  actions,
  mutations,
  getters
};