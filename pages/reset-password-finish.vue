<template>
<v-container fill-height>
    <v-layout justify-center align-center>
        <v-flex xs12 sm8 md5 class="lighten-5 purple rounded-card">
            <div v-if="alertObj.message">
                <v-alert :value="alertObj.message" :type="alertObj.type" :dismissible="true">
                    {{alertObj.message}}
                </v-alert>
            </div>
            <v-container class="text-xs-center">
                <v-card flat class="purple lighten-5">
                    <v-card-title primary-title>
                        <h4>Reset Password</h4>
                    </v-card-title>
                    <v-form @submit.prevent="resetPassword()">
                        <v-text-field prepend-icon="fas fa-user" solo v-model="fields.newPassword.value" name="newPassword"
                            label="New Password" :rules="fields.newPassword.rules" type="password" required></v-text-field>
                        <v-card-actions>
                            <v-btn type="submit" primary large block>Reset Password</v-btn>
                        </v-card-actions>
                    </v-form>
                </v-card>
            </v-container>
        </v-flex>
    </v-layout>
</v-container>
</template>
<style lang="scss" scoped>

</style>
<script>
	import axios from 'axios';
	axios.defaults.baseURL = process.env.VUE_APP_ROOT_API;
	export default {
		data: () => ({
			fields : {
				newPassword: {
					value: '',
					rules:  [v => !!v || 'New password is required'],
				}
			},
			alertObj : {
				message: '',
				type: ''
			}
		}),
		created() {

		},
		methods: {
			resetPassword() {
				return axios.post('/account/reset-password/finish', {
					key: this.$route.params.resetKey,
					newPassword: this.fields.newPassword.value
				})
				.then(response => {
					this.alertObj.type = "success";
					this.alertObj.message = "Your password has been reset successfully.";
				})
				.catch(error => {
					this.alertObj.type = 'error';
					this.alertObj.message = 'Unable to reset your password. Please try again later.';
				});
			}
		}
	}
</script>

