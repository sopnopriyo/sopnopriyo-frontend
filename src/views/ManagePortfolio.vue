<template>
    <div>
        <v-toolbar flat color="light">
            <v-toolbar-title>Portfolios</v-toolbar-title>
            <v-divider class="mx-2" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="700px">
                <v-btn slot="activator" color="primary" dark class="mb-2">New Portfolio</v-btn>
                <v-card>
					<v-form ref="form" v-model="valid" lazy-validation>
                    <v-card-title>
                        <span class="headline">{{ formTitle }}</span>
                    </v-card-title>
                    <v-card-text>
                        <v-container grid-list-md>
                            <v-layout wrap>
                                <v-flex xs12 sm12 md12>
                                    <v-text-field v-model="editedItem.title" :rules="formRules.title.rules" label="Title"></v-text-field>
                                </v-flex>
                                <v-flex xs12 sm12 md12>
                                    <v-textarea solo name="input-7-4" :rules="formRules.description.rules" label="Description"
                                        v-model="editedItem.description"></v-textarea>
                                </v-flex>
                                <v-flex xs12 sm12 md12>
                                    <v-text-field name="input-7-4" :rules="formRules.url.rules" label="URL"
                                        v-model="editedItem.url"></v-text-field>
                                </v-flex>
                                <v-flex xs12 lg6>
                                    <v-menu ref="menu1" :close-on-content-click="false" v-model="menu1" :nudge-right="40"
                                        lazy transition="scale-transition" offset-y full-width max-width="290px"
                                        min-width="290px">
                                        <v-text-field slot="activator" v-model="editedItem.date" :rules="formRules.date.rules"
                                            label="Date" hint="YYYY/MM/DD format" persistent-hint @blur="date = parseDate(editedItem.date)">
                                        </v-text-field>
                                        <v-date-picker v-model="date" no-title @input="menu1 = false"></v-date-picker>
                                    </v-menu>
                                </v-flex>
                                <v-flex xs12 sm12 md12>
                                    <v-text-field v-model="editedItem.coverPhotoUrl" :rules="formRules.coverPhotoUrl.rules"
                                        label="Cover Photo URL"></v-text-field>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-card-text>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1"  flat @click.native="close">Cancel</v-btn>
                        <v-btn color="blue darken-1"  :disabled="!valid" flat @click="save">Save</v-btn>
                    </v-card-actions>
					</v-form>
                </v-card>
            </v-dialog>
        </v-toolbar>
        <v-data-table :headers="headers" :items="computedPortfolios" :loading="loading" hide-actions class="elevation-1">
            <template slot="items" slot-scope="props">
                <td>{{ props.item.title }}</td>
                <td>{{(props.item.description || '').substring(0, 50) + '…'}}</td>
                <td>{{ props.item.url }}</td>
                <td>{{ props.item.date }}</td>
                <td class="justify-center layout px-0">
                    <v-icon small class="mr-2" @click="editItem(props.item)">
                        edit
                    </v-icon>
                    <v-icon small @click="deleteItem(props.item)">
                        delete
                    </v-icon>
                </td>
            </template>
            <template slot="no-data">
                <v-btn color="primary" @click="initialize">Reset</v-btn>
            </template>
        </v-data-table>
    </div>
</template>
<style lang="scss">
</style>
<script>
import axios from 'axios';
axios.defaults.baseURL = process.env.VUE_APP_ROOT_API;

export default {
    data: () => ({
		dialog: false,
		valid: false,
        headers: [{
                text: 'Title',
                align: 'left',
                sortable: false,
                value: 'title'
            },
            {
                text: 'Description',
                align: 'left',
                sortable: false,
                value: 'description'
            },
            {
                text: 'URL',
                align: 'left',
                sortable: false,
                value: 'url'
            },
            {
                text: 'Date',
                align: 'left',
                sortable: true,
                value: 'date'
            },
            {
                text: 'Action',
                align: 'center',
                sortable: false
            },
        ],
        portfolios: [],
        editedIndex: -1,
        date: null,
		menu1: false,
		loading: false,
        editedItem: {
            title: '',
            description: "",
			url: "",
			date: (new Date()).toISOString(),
            coverPhotoUrl: ''
        },
        defaultItem: {
            title: '',
            description: "",
			url: "",
			date: (new Date()).toISOString(),
            coverPhotoUrl: ''
        },
		formRules: {
			title: {
				rules:  [v => !!v || 'Title is required'],
			},
			description: {
				rules:  [v => !!v || 'Description is required'],
			},
			url: {
				rules:  [v => !!v || 'Url is required'],
			},
			date: {
				rules:  [v => !!v || 'Date is required'],
			},
			coverPhotoUrl: {
				rules:  [v => !!v || 'Cover Photo Url is required'],
			}
		}
    }),

    computed: {
        formTitle() {
            return this.editedIndex === -1 ? 'New Portfolio' : 'Edit Portfolio';
        },
        computedPortfolios() {
            return this.$store.getters.portfolioList || [];
        },
        token() {
            return this.$store.state.token;
        },
        computedDateFormatted() {
            return this.formatDate(this.date)
        }
    },

    watch: {
        dialog(val) {
            val || this.close();
        },
        date(val) {
            this.editedItem.date = this.formatDate(this.date)
        }
    },

    created() {
        this.initialize();
		axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.token
    },

    methods: {
        initialize() {
			this.loading = true;

			this.$store.dispatch('fetchPortfolios')
			.then(response => {
				this.loading = false;
			})
			.catch(err => {
				this.loading = false;
			})
        },

        editItem(item) {

            this.editedIndex = this.computedPortfolios.indexOf(item);
            this.editedItem = Object.assign({}, item);
            this.dialog = true;
        },

        deleteItem(item) {
            if (confirm('Are you sure you want to delete this portfolio?')) {
                return axios.delete('/portfolios/' + item.id)
                    .then(response => {
                        this.initialize()
                    })
                    .catch(errors => {
						console.error('Error occurred while deleting portfolio')
                    })
            }
        },

        close() {
            this.dialog = false;
            setTimeout(() => {
                this.editedItem = Object.assign({}, this.defaultItem);
                this.editedIndex = -1;
            }, 300);
        },

        save() {

			 if (this.$refs.form.validate()) {
            let savePromise;
            if (this.editedIndex > -1) {
                savePromise = axios.put('/portfolios', this.editedItem)
            } else {
                savePromise = axios.post('/portfolios', {
                    title: this.editedItem.title,
                    description: this.editedItem.description,
                    url: this.editedItem.url,
                    date: this.editedItem.date,
                    coverPhotoUrl: this.editedItem.coverPhotoUrl,
                })
            }
            return savePromise
                .then(response => {
                    this.initialize();
                    this.close();
                })
                .catch(error => {
                    this.close();
				})
			 }
        },
        formatDate(date) {
            if (!date) return null
			date = date.substr(0,10);
            const [year, month, day] = date.split('-')
            return `${year}-${month}-${day}`+`T12:01:14.915Z`
        },
        parseDate(date) {
			if (!date) return null
			date = date.substr(0, 10);
            const [year, month, day] = date.split('-')
            return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`+`T12:01:14.915Z`
        }
    }
};
</script>

