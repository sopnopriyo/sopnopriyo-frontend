<template>
  <div class="about">
    <h1>This is an about page</h1>
	<p>{{authUser}}</p>
  </div>
</template>
<style lang="scss">

</style>
<script>
export default {
	created() {
		if(!this.authUser) {
		 	this.$store.dispatch('authenticateUser');
		}
	},
	computed: {
        authUser() {
            return this.$store.getters.authUser;
		}
	},
}
</script>
