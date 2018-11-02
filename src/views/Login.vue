<template>
    <v-container fill-height>
        <v-layout justify-center align-center>
            <v-flex xs12 sm8 md5 class="lighten-5 purple rounded-card">
					<v-alert
					:value="authError"
					type="error"
					:dismissible="true"
				>
					Authentication error !
				</v-alert>
                <v-container class="text-xs-center">
                    <v-card flat class="purple lighten-5">
                        <v-card-title primary-title>
                            <h4>Login</h4>
                        </v-card-title>
                        <v-form >
                            <v-text-field prepend-icon="fas fa-user" v-model="fields.username.value" name="Username"
                                label="Username" :rules="fields.username.rules" required></v-text-field>
                            <v-text-field prepend-icon="fas fa-key" v-model="fields.password.value" name="Password"
                                label="Password" :rules="fields.password.rules" type="password" required></v-text-field>
                            <v-card-actions>
                                <v-btn primary large block @click.prevent="performlogin()">Login</v-btn>
                            </v-card-actions>
                        </v-form>
                    </v-card>
                </v-container>
            </v-flex>
        </v-layout>
    </v-container>
</template>
<style lang="scss">
	.rounder-card {
		border-radius: 8px;
	}
</style>
<script>
export default {
    data: () => {
        return {
            fields: {
                username: {
                    value: '',
                    rules:  [v => !!v || 'Username is required'],
                },
                password: {
                    value: '',
                    rules: [ v => !!v || 'Password is required'],
                }
			},
			authError: false
        };
    },
    created() {},
    methods: {
        performlogin() {
            this.$store
                .dispatch('retrieveToken', {
                    username: this.fields.username.value,
                    password: this.fields.password.value
                })
                .then(response => {
                    this.$router.push({ name: 'dashboard' });
                })
                .catch(error => {
					this.authError = true;
					console.log(error);
                });
        }
    }
};
</script>


