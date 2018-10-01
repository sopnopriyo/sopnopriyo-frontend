<template>
	<form>
		<div class="login-form">
			<div>
				<label for="username">
					Username : 
				</label>
				<input name="username" type="text" v-model="fields.username.value" placeholder="Enter username"/>
			</div>
			<div>
				<label for="password">
					Password : 
				</label>
				<input name="password" type="password" v-model="fields.password.value" placeholder="Enter password"/>
			</div>
			<div>
				<button type="submit" name="sign-in" @click.prevent="performlogin()"> Log In</button>
			</div>
		</div>
	</form>
</template>
<style lang="scss">
	.login-form {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
	}
	.login-form div {
		display: flex;
		flex-direction: row;
	}
</style>
<script>
	export default {
		data: () => {
			return {
				fields: {
					username: {
						value: "",
						feedback: ""
					},	
					password: {
						value: "",
						feedback: ""
					}	
				}
			};
		},
		created () {

		},
		methods: {
			performlogin() {
				console.log(this.fields.username.value+'  --  '+this.fields.password.value)
				this.$store.dispatch('retrieveToken', {
					username: this.fields.username.value,
					password: this.fields.password.value
				})
				.then(response => {
					this.$router.push({ name: 'dashboard' })
				})
				.catch(error => {
					console.log(error)
				});
			}
		}
	}
</script>


