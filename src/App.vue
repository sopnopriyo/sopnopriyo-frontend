<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
	  <span v-if="loggedIn">
	  	<router-link v-if="loggedIn" to="/dashboard">Dashboard</router-link> |
      	<router-link v-if="loggedIn" to="/logout">Logout</router-link> | 
	  </span>
	  <span v-else>
		<router-link v-if="!loggedIn" to="/about">About</router-link> |
		<router-link v-if="!loggedIn" to="/login">Login</router-link> |
	  </span>
	  </div>
    <router-view/>
  </div>
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
    computed: {
        loggedIn() {
            return this.$store.getters.loggedIn;
        }
    }
};
</script>

