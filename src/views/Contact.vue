<template>
    <v-container fluid grid-list-md>
        <h1 class="mt-5 text-md-center">Contact Me</h1>
            <v-layout align-center justify-center row wrap>
                <v-flex xs12 sm12 md4>
                    <v-text-field name="name" v-model="contact.name" :rules="nameRules" label="Name" required></v-text-field>
                </v-flex>
                <v-flex xs12 sm12 md4>
                    <v-text-field name="email" v-model="contact.email" :rules="emailRules" label="E-mail" required></v-text-field>
                </v-flex>
                <v-flex xs12 sm12 md8>
                    <v-text-field name="subject" v-model="contact.subject" :rules="subjectRules" label="Subject"
                        required></v-text-field>
                </v-flex>
                <v-flex xs12 sm12 md8>
                    <v-textarea name="body" label="Body" :rules="bodyRules"></v-textarea>
                </v-flex>
                <v-flex xs12 sm12 md8>
                    <v-btn primary large block>Send</v-btn>
                </v-flex>
            </v-layout>
    </v-container>
</template>
<style lang="scss">
</style>
<script>
export default {
	data: () => ({
    valid: false,
	contact: {
		name: '',
		email: '',
		subject: '',
		body:''
	},
    nameRules: [
      v => !!v || 'Name is required',
      v => v.length <= 10 || 'Name must be less than 10 characters'
    ],
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+/.test(v) || 'E-mail must be valid'
	],
	subjectRules: [
		v => !!v || 'Subject is required',
	],
	bodyRules:[
		v => !!v || 'Budy is required',
	],

  })
}
</script>


