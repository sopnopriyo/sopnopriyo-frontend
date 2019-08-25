<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app clipped class="red" dense>
      <v-list dense>
        <v-list-item v-for="item in computedItems  " :key="item.text" :to="item.path">
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app clipped-left color="red" dense>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-icon class="mx-4">fab fa-youtube</v-icon>
      <v-toolbar-title class="mr-12 align-center">
        <span class="title">Sopnopriyo</span>
      </v-toolbar-title>
      <div class="flex-grow-1"></div>
      <v-btn color="red" @click="performLogout()">Logout</v-btn>
    </v-app-bar>

    <v-content>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </v-content>
  </v-app>
</template>

<style lang="scss">
</style>
<script>
const Cookie = process.client ? require("js-cookie") : undefined;
export default {
  data: () => ({
    drawer: true,
    menuItems: [
      {
        icon: "fas fa-tachometer-alt",
        path: "/admin/dashboard",
        text: "Dashboard"
      },
      { icon: "fab fa-blogger", path: "/admin/blog", text: "Blog" }
    ],
    adminMenus: [
      { icon: "fas fa-user", path: "/admin/user", text: "Users" },
      { icon: "fas fa-archive", path: "/admin/portfolio", text: "Portfolio" },
      { icon: "fas fa-envelope", path: "/admin/contact", text: "Message" },
      {
        icon: "far fa-laptop-code",
        path: "admin/apidefination",
        text: "API Specification"
      }
    ]
  }),
  created() {
    if (!this.$store.state.auth.authUser) {
      this.$store.dispatch("auth/setAuthUser");
    }
  },
  computed: {
    computedItems() {
      let authUser = this.$store.state.auth.authUser;
      var isAdmin = false;

      var allMenus = [];
      if (authUser) {
        if (authUser.authorities.includes("ROLE_ADMIN")) {
          allMenus = this.menuItems.concat(this.adminMenus);
        } else {
          allMenus = this.menuItems;
        }
      }
      return allMenus;
    }
  },
  methods: {
    performLogout() {
      Cookie.remove("auth");
      this.$store.commit("auth/setAuth", null);
      this.$router.push("/login");
    }
  }
};
</script>