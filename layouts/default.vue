<template>
  <div id="__container">
    <div class="container">
      <nav class="navbar navbar-expand-lg">
        <nuxt-link class="navbar-brand" to="/">Sopnopriyo</nuxt-link>
        <button
          class="navbar-toggler navbar-toggler-right"
          type="button"
          data-toggle="collapse"
          data-target="#navb"
          @click="toggleNavMenu()"
        >
          <i class="fa fa-bars" v-if="!isMenuOpen"></i>
          <i class="fa fa-times" v-else></i>
        </button>

        <div class="collapse navbar-collapse" v-bind:class="{ 'show': isMenuOpen}" id="navb">
          <ul class="navbar-nav ml-auto">
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
    </div>

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
.show {
  display: block;
}
.content {
  min-height: 82vh;
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
      list-style: none;
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
    isBlogDropdownExpanded: false
  }),
  created() {
    this.$store.dispatch("header/setMenu");
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.auth;
    },
    items() {
      return this.$store.getters["header/allMenuItems"];
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


