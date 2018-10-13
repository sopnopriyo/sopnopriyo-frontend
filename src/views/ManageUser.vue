<template>
    <div>
        <v-toolbar flat color="light">
            <v-toolbar-title>Users</v-toolbar-title>
            <v-divider class="mx-2" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="500px">
                <v-btn slot="activator" color="primary" dark class="mb-2">New User</v-btn>
                <v-card>
                    <v-card-title>
                        <span class="headline">{{ formTitle }}</span>
                    </v-card-title>

                    <v-card-text>
                        <v-container grid-list-md>
                            <v-layout wrap>
                                <v-flex xs12 sm6 md4>
                                    <v-text-field v-model="editedItem.login" label="Username"></v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6 md4>
                                    <v-text-field v-model="editedItem.email" label="Email"></v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6 md4>
                                    <v-text-field v-model="editedItem.firstName" label="First Name"></v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6 md4>
                                    <v-text-field v-model="editedItem.lastName" label="Last Name"></v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6 md8>
                                    <v-combobox 
										v-model="editedItem.authorities" 
										:items="roles" 
										label="Roles" 
										multiple
										chips
                                    ></v-combobox>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-card-text>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" flat @click.native="close">Cancel</v-btn>
                        <v-btn color="blue darken-1" flat @click.native="save">Save</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-toolbar>
        <v-data-table :headers="headers" :items="userList" hide-actions class="elevation-1">
            <template slot="items" slot-scope="props">
                <td>{{ props.item.login }}</td>
                <td class="text-xs-right">{{ props.item.email }}</td>
                <td class="text-xs-right">{{ props.item.firstName }}</td>
                <td class="text-xs-right">{{ props.item.lastName }}</td>
                <td class="text-xs-right">
                    <v-flex no-wrap xs5 sm3>
                        <v-chip v-for="role in props.item.authorities" :key="role" color="blue lighten-4" class="ml-0"
                            label small>
                            {{role}}
                        </v-chip>
                    </v-flex>
                </td>
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
<style lang="sass">

</style>
<script>
import axios from 'axios';
axios.defaults.baseURL = process.env.VUE_APP_ROOT_API;
export default {
    data: () => ({
        dialog: false,
        headers: [{
                text: 'Username',
                align: 'left',
                sortable: false,
                value: 'login'
            },
            {
                text: 'Email',
                value: 'email'
            },
            {
                text: 'First Name',
                value: 'firstName'
            },
            {
                text: 'Last Name',
                value: 'lastName'
            },
            {
                text: 'Authorities',
                value: 'authorities',
                sortable: false
            },
            {
                text: 'Actions',
                value: 'action',
                sortable: false
            }
        ],
        desserts: [],
        editedIndex: -1,
        editedItem: {
            id: '',
            login: '',
            email: '',
            firstName: '',
            lastName: '',
			authorities: [],
			date: (new Date()).toISOString(),
        },
        defaultItem: {
            login: '',
            email: '',
            firstName: '',
            lastName: '',
			authorities: [],
			date: (new Date()).toISOString(),
        },
        roles: [
            "ROLE_USER", "ROLE_ADMIN"
        ]
    }),

    computed: {
        formTitle() {
            return this.editedIndex === -1 ? 'New User' : 'Edit User';
        },
        userList() {
            return this.$store.getters.userList || [];
        }
    },

    watch: {
        dialog(val) {
            val || this.close();
        }
    },

    created() {
        this.initialize();
    },

    methods: {
        initialize() {
            this.$store.dispatch('fetchUsers');
        },

        editItem(item) {
            this.editedIndex = this.userList.indexOf(item);
            this.editedItem = Object.assign({}, item);
            this.dialog = true;
        },

        deleteItem(item) {
            if (confirm('Are you sure you want to delete this user?')) {
                return axios.delete('/users/' + item.login)
                    .then(response => {
                        this.initialize()
                    })
                    .catch(errors => {

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
            let savePromise;
            if (this.editedIndex > -1) {
                savePromise = axios.put('/users', this.editedItem)
            } else {
                savePromise = axios.post('/users', {
                    firstName: this.editedItem.firstName,
                    lastName: this.editedItem.lastName,
                    login: this.editedItem.login,
                    authorities: this.editItem.authorities,
                    email: this.editedItem.email
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
    }
};
</script>

