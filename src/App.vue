<template>
  <div id="app" v-if="!loggedIn">
    <div id="nav">
      <router-link to="/">Home</router-link> |
	 	<router-link to="/about">About</router-link> |
		<router-link to="/login">Login</router-link> |
	</div>
    <router-view/>
  </div>
  <v-app
    id="inspire"
    dark
	v-else
  >
    <v-navigation-drawer
      v-model="drawer"
      fixed
      clipped
      app
    >
      <v-list dense>
        <v-list-tile v-for="item in items" :key="item.text" :to="item.path">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              {{ item.text }}
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      color="red"
      dense
      fixed
      clipped-left
      app
    >
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title class="mr-5 align-center">
        <span class="title">Sopnopriyo</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
	  <v-layout justify-end row>
		  <v-btn to="/logout">To</v-btn>
      </v-layout>
    </v-toolbar>
    <v-content>
		<router-view></router-view>
    </v-content>
  </v-app>
</template>

<style lang="scss">
	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
	}
	#nav {
		padding: 30px;
		a {
			font-weight: bold;
			color: #2c3e50;
			&.router-link-exact-active {
				color: #42b983;
			}
		}
	}
</style>
<script>
export default {
    data: () => ({
        drawer: true,
        items: [
            { icon: 'fas fa-tachometer-alt', path: 'dashboard', text: 'Dashboard' },
            { icon: 'fas fa-user', path: 'manageuser', text: 'Users' },
            { icon: 'fab fa-blogger', path: 'manageblog', text: 'Blog' },
            { icon: 'fas fa-archive', path: 'manageportfolio', text: 'Portfolio' },
            { icon: 'fas fa-envelope', path: 'managecontact', text: 'Message' }
        ]
    }),
    props: {
        source: String
    },
    computed: {
        loggedIn() {
            return this.$store.getters.loggedIn;
        }
    }
};
</script>