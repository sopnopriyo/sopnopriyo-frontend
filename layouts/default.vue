<template>
  <div id="__container">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <nuxt-link class="navbar-brand" to="/">Sopnopriyo</nuxt-link>
      <button
        class="navbar-toggler navbar-toggler-right"
        type="button"
        data-toggle="collapse"
        data-target="#navb"
        @click="toggleNavMenu()"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" v-bind:class="{ 'show': isMenuOpen}" id="navb">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" @click="toggleBlogDropDown()" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Blog
            </a>
            <div class="dropdown-menu" :class="{'show' : isBlogDropdownExpanded}" aria-labelledby="navbarDropdown">
              <a class="dropdown-item" href="#">Tech</a>
              <a class="dropdown-item" href="#">Career</a>
              <a class="dropdown-item" href="#">Reviews</a>
            </div>
          </li>
          <li class="nav-item" v-for="item in items" :key="item.path">
            <nuxt-link class="nav-link" :to="item.path">{{item.text}}</nuxt-link>
          </li>
          <li class="nav-item">
            <nuxt-link v-if="!loggedIn" class="nav-link" to="/login">
              <strong>Login</strong>
            </nuxt-link>
            <nuxt-link v-else class="nav-link" to="#" @click="logout()">
              Sign Out
              <i class="fa fa-sign-out"></i>
            </nuxt-link>
          </li>
        </ul>
      </div>
    </nav>

    <main class="content">
      <router-view></router-view>
    </main>

    <footer class="social-footer">
      <div class="social-footer-icons">
        <ul class="menu simple">
          <li v-for="socialLink in socialLinks" :key="socialLink.link">
            <a :href="socialLink.link">
              <i :class="socialLink.icon" aria-hidden="true"></i>
            </a>
          </li>
        </ul>
      </div>
      <div class="social-footer-left">
        &copy;2019 —
        <strong>Sopnopriyo</strong>
      </div>
    </footer>
  </div>
</template>
<style lang="scss">
.content {
  position: relative;
  min-height: 80vh;
}
.social-footer {
  padding: 1rem;
  background: #2c3840;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  color: #f4f4f4;

  .social-footer-icons {
    margin-bottom: 20px;
    ul {
      display: inline-flex;
    }
    li {
      margin-left: 20px;
      font-size: 20px;
    }
    li:last-of-type {
      margin-right: 0;
    }

    .fa {
      font-size: 1.8rem;
      color: #f4f4f4;
      &:hover {
        transition: color 0.3s ease-in;
        color: #41525e;
      }
    }
  }
}
</style>
<script>
const Cookie = process.client ? require("js-cookie") : undefined;

export default {
  data: () => ({
    items: [
      {
        path: "/blog-category",
        text: "Blog",
        children: [
          
        ]
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
    socialLinks: [
      {
        icon: "fa fa-facebook",
        link: "https://facebook.com/sopnopriyoo/"
      },
      {
        icon: "fa fa-instagram",
        link: "https://www.instagram.com/sopno.priyo/"
      },
      {
        icon: "fa fa-twitter",
        link: "https://twitter.com/sopnopriyo"
      },
      {
        icon: "fa fa-linkedin",
        link: "https://www.linkedin.com/in/sopnopriyo/"
      },
      {
        icon: "fa fa-github",
        link: "https://github.com/sopnopriyo/sopnopriyo"
      },
      {
        icon: "fa fa-stack-overflow",
        link: "https://stackoverflow.com/users/4778904/shahin-alam"
      }
    ],
    isMenuOpen: false,
    isBlogDropdownExpanded: false,
  }),
  computed: {
    loggedIn() {
      return this.$store.state.auth.auth;
    }
  },
  methods: {
    logout() {
      Cookie.remove("auth");
      this.$store.commit("auth/setAuth", null);
    },
    toggleNavMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    toggleBlogDropDown() {
      this.isBlogDropdownExpanded = !this.isBlogDropdownExpanded;
    }
  }
};
</script>


