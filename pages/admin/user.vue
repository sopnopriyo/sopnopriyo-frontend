<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="userList"
      class="elevation-1"
      :page.sync="pagination.page"
      :items-per-page="pagination.rowsPerPage"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>Users</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <div class="flex-grow-1"></div>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on }">
              <v-btn color="primary" dark class="mb-2" v-on="on">New User</v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="12" md="12">
                      <v-text-field v-model="editedItem.login" label="Username"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="12" md="12">
                      <v-text-field v-model="editedItem.email" label="Email"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="12" md="12">
                      <v-text-field v-model="editedItem.email" label="First Name"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="12" md="12">
                      <v-text-field v-model="editedItem.email" label="Last Name"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="12" md="12">
                      <v-select
                        :items="roles"
                        v-model="editedItem.authorities"
                        label="Role"
                        outlined
                        multiple
                      ></v-select>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <div class="flex-grow-1"></div>
                <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="save">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.action="{ item }">
        <v-btn small class="mr-2" @click="editItem(item)">edit</v-btn>
        <v-btn small @click="deleteItem(item)">delete</v-btn>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize">Reset</v-btn>
      </template>
    </v-data-table>
  </div>
</template>
<style lang="sass">

</style>
<script>
import axios from "axios";
export default {
  layout: "admin-panel",
  middleware: "authenticated",
  data: () => ({
    dialog: false,
    headers: [
      {
        text: "Username",
        align: "left",
        sortable: false,
        value: "login"
      },
      {
        text: "Email",
        value: "email",
        align: "left",
        sortable: false
      },
      {
        text: "First Name",
        value: "firstName",
        align: "left",
        sortable: false
      },
      {
        text: "Last Name",
        value: "lastName",
        align: "left",
        sortable: false
      },
      {
        text: "Authorities",
        value: "authorities",
        sortable: false,
        align: "left"
      },
      {
        text: "Actions",
        value: "action",
        sortable: false
      }
    ],
    desserts: [],
    editedIndex: -1,
    loading: false,
    editedItem: {
      id: "",
      login: "",
      email: "",
      firstName: "",
      lastName: "",
      authorities: [],
      date: ""
    },
    pagination: {
      page: 1,
      rowsPerPage: 10
    },
    defaultItem: {
      login: "",
      email: "",
      firstName: "",
      lastName: "",
      authorities: ["ROLE_USER"],
      date: new Date().toISOString()
    },
    roles: ["ROLE_USER", "ROLE_ADMIN"]
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New User" : "Edit User";
    },
    userList() {
      if (this.$store.state.user.userListResponse) {
        return this.$store.state.user.userListResponse || [];
      }
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
      this.loading = true;
      let paginationFilter = {};
      paginationFilter.sort = "date,desc";
      paginationFilter.size = this.pagination.rowsPerPage;
      paginationFilter.page = this.pagination.page - 1;

      this.$store
        .dispatch("user/fetchUsers", {
          token: this.$store.state.auth.auth,
          pagination: paginationFilter
        })
        .then(response => {
          this.loading = false;
        })
        .catch(err => {
          this.loading = false;
        });
    },

    editItem(item) {
      this.editedIndex = this.userList.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      if (confirm("Are you sure you want to delete this user?")) {
        return axios
          .delete("/users/" + item.login)
          .then(response => {
            this.initialize();
          })
          .catch(errors => {});
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
        savePromise = axios.put("/users", this.editedItem);
      } else {
        savePromise = axios.post("/users", {
          firstName: this.editedItem.firstName,
          lastName: this.editedItem.lastName,
          login: this.editedItem.login,
          authorities: this.editedItem.authorities,
          email: this.editedItem.email
        });
      }
      return savePromise
        .then(response => {
          this.initialize();
          this.close();
        })
        .catch(error => {
          this.close();
        });
    }
  }
};
</script>

