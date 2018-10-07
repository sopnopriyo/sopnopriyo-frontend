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
	},
	computed: {
        authUser() {
            return this.$store.getters.authUser;
		}
	},
}
</script>
