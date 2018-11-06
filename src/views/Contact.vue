<template>
    <v-container fluid grid-list-md>
        <h1 class="mt-5 text-md-center">Contact Me</h1>
        <v-layout align-center justify-center row wrap>
            <v-card hover>
                <v-container fill-height fluid>
                    <v-form ref="form" v-model="valid" lazy-validation @submit.prevent="save()">
                        <v-layout align-center justify-center row wrap>
                            <v-flex xs12 sm12 md12 v-if="alert.message != ''">
                                <v-alert :value="alert.show" :type="alert.type" :dismissible="true">
                                    {{alert.message}}
                                </v-alert>
                            </v-flex>
                            <v-flex xs12 sm12 md6>
                                <v-text-field name="name" v-model="contact.name" solo :rules="nameRules" label="Name"
                                    required></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm12 md6>
                                <v-text-field name="email" v-model="contact.email" solo :rules="emailRules" label="E-mail"
                                    required></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm12 md12>
                                <v-textarea name="message" label="Message" solo v-model="contact.message" :rules="messageRules"></v-textarea>
                            </v-flex>
                            <v-flex xs12 sm12 md2>
                                <v-btn type="submit" primary medium block>Send</v-btn>
                            </v-flex>
                        </v-layout>
                    </v-form>
                </v-container>
            </v-card>
        </v-layout>
    </v-container>
</template>
<style lang="scss">
</style>
<script>
import axios from 'axios';
axios.defaults.baseURL = process.env.VUE_APP_ROOT_API;
export default {
    data: () => ({
		valid: false,
		alert: {
			show: false,
			type: 'success',
			message: ''
		},
        contact: {
            name: '',
            email: '',
			message: '',
			date: (new Date()).toISOString(),
		},
        nameRules: [
            v => !!v || 'Name is required'
        ],
        emailRules: [
            v => !!v || 'E-mail is required',
            v => /.+@.+/.test(v) || 'E-mail must be valid'
        ],
        messageRules: [
            v => !!v || 'Body is required',
        ],
	}),
	methods: {
		save() {
			if (this.$refs.form.validate()) {
				axios.post('/messages', this.contact)
				.then(response => {
					this.alert.show = true;
					this.alert.type = 'success'
					this.alert.message = 'Your message has been sent successfully !';
					this.$refs.form.reset();

				})
				.catch(err => {
					this.alert.show = true;
					this.alert.type = 'error'
					this.alert.message = 'Sorry, an error has been encountered while sending your message.';
					this.$refs.form.reset()
				});
			}
		},
	}
}
</script>


