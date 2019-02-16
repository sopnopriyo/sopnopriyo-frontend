<template>
    <v-container fill-height>
        <v-layout justify-center align-center>
            <v-flex xs12 sm8 md5 class="lighten-5 purple rounded-card">
                <v-alert
					:value="alert.message"
					:type="alert.type"
					:dismissible="true"
				>
					{{alert.message}}
				</v-alert>
                <v-container class="text-xs-center">
                    <v-card flat class="purple lighten-5">
                        <v-card-title primary-title>
                            <h4>Reset Password</h4>
                        </v-card-title>
                        <v-form @submit.prevent="resetPassword()">
                            <v-text-field prepend-icon="fas fa-user" solo v-model="fields.email.value" name="email"
                                label="Email" :rules="fields.email.rules" required></v-text-field>
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
	    data: () => {
	        return {
	            fields: {
	                email: {
	                    value: '',
	                    rules:  [v => !!v || 'Email is required'],
	                }
	            },
	            alert: {
	                message: '',
	                type: ''
	            }
	        }
	    },
	    created() {

	    },
	    methods: {
	        resetPassword() {
	            let axiosConfig = {
	                headers: {
	                    'Content-Type': 'application/json;charset=UTF-8'
	                }
	            };
	            axios.post('/account/reset-password/init', {
	                        mail: this.fields.email.value
	                    },
	                    axiosConfig)
	                .then(function (response) {
	                    console.log(response);
	                    this.alert.type = "success";
	                    this.alert.message = "Your password reset request has been sent. Please check your email.";
	                })
	                .catch(function (error) {
	                    console.log(error);
	                    this.alert.type = "error";
	                    this.alert.message = "Unable to send password reset request. Please try again later.";
	                });
	        }
	    }
	}
</script>

