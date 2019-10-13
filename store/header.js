import axios from 'axios';
axios.defaults.baseURL =
  process.env.NODE_ENV === "development"
    ? process.env.DEV_API
    : process.env.PROD_API;
const state = () => ({
    blogMenuItems: [],
    menuItems: [
        {
          path: "/blog",
          text: "Blog",
          children: []
        },
        {
          path: "/portfolio",
          text: "Portfolio"
        },
        {
          path: "/contact",
          text: "Contact"
        },
        {
          path: "/about",
          text: "About Me"
        }
      ],
});
  
const getters = {
    allMenuItems: state => {
        return state.menuItems.map(item =>
            item.text === 'Blog'
              ? { ...item, children: state.blogMenuItems }
              : item
        );
    }
};
  
const actions = {
  setMenu(context) {
      return new Promise((resolve, reject) => {
          return axios.get('/blogs/categories')
              .then(response => {
                  const blogMenuItems = response.data
                  context.commit('setMenu', blogMenuItems)
                  resolve(blogMenuItems);
              })
              .catch(error => {
                  console.log(error);
                  reject(error)
              });
      });
  },
};
  
const mutations = {
    setMenu(state, blogMenuItems) {
      state.blogMenuItems = blogMenuItems
  },
};

export default {
  state,
  actions,
  mutations,
  getters
};