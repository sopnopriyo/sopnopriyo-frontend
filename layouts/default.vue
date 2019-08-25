<template>
  <v-app>
    <nav>
      <v-toolbar color="purple" dense fixed class="hidden-sm-and-down">
        <v-toolbar-title>
          <router-link to="/" class="white--text" tag="span" style="cursor: pointer">Sopnopriyo</router-link>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn v-for="item in items" :key="item.path" :to="item.path" ripple class="white--text">
            {{
            item.text}}
          </v-btn>
          <v-btn v-if="loggedIn" class="white--text" @click="logout()">Log Out</v-btn>
          <v-btn v-else class="white--text" :to="'/login'">Login</v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <div class="hidden-md-and-up">
        <v-expansion-panel>
          <v-expansion-panel-content class="purple">
            <div slot="header">
              <router-link to="/" tag="span" style="cursor: pointer">Sopnopriyo</router-link>
            </div>
            <v-card v-for="item in items" :key="item.path">
              <router-link :to="item.path" tag="span">
                <v-card-text class="purple white--text">{{item.text}}</v-card-text>
              </router-link>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </div>
    </nav>
    <v-content>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </v-content>
    <v-footer height="auto">
      <v-card class="flex" tile>
        <v-card-title class="purple lighten-1 white--text text-xs-center justify-center">
          <v-btn
            v-for="socialLink in socialLinks"
            target="blank"
            :href="socialLink.link"
            :key="socialLink.icon"
            class="mx-3"
            dark
            icon
          >
            <v-icon medium>{{ socialLink.icon }}</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-actions class="purple justify-center">
          &copy;2019 —
          <strong>Sopnopriyo</strong>
        </v-card-actions>
      </v-card>
    </v-footer>
  </v-app>
</template>
<style>
.theme--light.v-btn:not(.v-btn--flat):not(.v-btn--text):not(.v-btn--outlined) {
  background-color: unset;
}
</style>
<script>
const Cookie = process.client ? require("js-cookie") : undefined;

export default {
  data: () => ({
    items: [
      {
        path: "/",
        text: "Home"
      },
      {
        path: "/blog",
        text: "Blog"
      },
      {
        path: "/portfolio",
        text: "portfolio"
      },
      {
        path: "/contact",
        text: "Contact"
      }
    ],
    socialLinks: [
      {
        icon: "fab fa-facebook",
        link: "https://facebook.com/sopnopriyoo/"
      },
      {
        icon: "fab fa-instagram",
        link: "https://www.instagram.com/sopno.priyo/"
      },
      {
        icon: "fab fa-twitter",
        link: "https://twitter.com/sopnopriyo"
      },
      {
        icon: "fab fa-linkedin",
        link: "https://www.linkedin.com/in/sopnopriyo/"
      },
      {
        icon: "fab fa-github",
        link: "https://github.com/sopnopriyo/sopnopriyo"
      },
      {
        icon: "fab fa-stack-overflow",
        link: "https://stackoverflow.com/users/4778904/shahin-alam"
      }
    ]
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
    }
  }
};
</script>


