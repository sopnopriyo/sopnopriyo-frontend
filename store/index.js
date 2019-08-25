const cookieparser = process.server ? require('cookieparser') : undefined

const state = () => ({

});
  
const getters = {

};

const actions = {
    nuxtServerInit ({ commit }, { req }) {
        if (req.headers.cookie) {
            const parsed = cookieparser.parse(req.headers.cookie)
            commit('auth/setAuth', parsed.auth)
        }
    },
};

const mutations = {

};
  
export default {
    state,
    actions,
    mutations,
    getters
};