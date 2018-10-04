<template>
	<div>
      <v-toolbar flat color="light">
        <v-toolbar-title>Users</v-toolbar-title>
        <v-divider
          class="mx-2"
          inset
          vertical
        ></v-divider>
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
                  <v-flex xs12 sm6 md4>
                    <v-text-field v-model="editedItem.authorities" label="authorities"></v-text-field>
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
      <v-data-table
        :headers="headers"
        :items="userList"
        hide-actions
        class="elevation-1"
      >
        <template slot="items" slot-scope="props">
          <td>{{ props.item.login }}</td>
          <td class="text-xs-right">{{ props.item.email }}</td>
          <td class="text-xs-right">{{ props.item.firstName }}</td>
          <td class="text-xs-right">{{ props.item.lastName }}</td>
		  <td class="text-xs-right">{{ props.item.authorities }}</td>
          <td class="justify-center layout px-0">
            <v-icon
              small
              class="mr-2"
              @click="editItem(props.item)"
            >
              edit
            </v-icon>
            <v-icon
              small
              @click="deleteItem(props.item)"
            >
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
export default {
    data: () => ({
        dialog: false,
        headers: [
            {
                text: 'Username',
                align: 'left',
                sortable: false,
                value: 'login'
            },
            { text: 'Email', value: 'email' },
            { text: 'First Name', value: 'firstName' },
            { text: 'Last Name', value: 'lastName' },
            { text: 'Authorities', value: 'authorities', sortable: false },
            { text: 'Actions', value: 'action', sortable: false }
        ],
        desserts: [],
        editedIndex: -1,
        editedItem: {
            login: '',
            email: '',
            firstName: '',
            lastName: '',
            authorities: ''
        },
        defaultItem: {
            login: '',
            email: '',
            firstName: '',
            lastName: '',
            authorities: ''
        }
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
            const index = this.userList.indexOf(item);
			confirm('Are you sure you want to delete this item?') && this.userList.splice(index, 1);
			//Save into database
        },

        close() {
            this.dialog = false;
            setTimeout(() => {
                this.editedItem = Object.assign({}, this.defaultItem);
                this.editedIndex = -1;
            }, 300);
        },

        save() {
            if (this.editedIndex > -1) {
				Object.assign(this.userList[this.editedIndex], this.editedItem);
				
				// Save into database
            } else {
                this.userList.push(this.editedItem);
            }
            this.close();
        }
    }
};
</script>

