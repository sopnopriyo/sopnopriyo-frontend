<template>
  <div>
    <v-toolbar flat color="light">
      <v-toolbar-title>Messages</v-toolbar-title>
      <v-divider class="mx-2" inset vertical></v-divider>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" max-width="700px">
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm12 md12>
                  <v-text-field v-model="editedItem.name" solo label="Name"></v-text-field>
                </v-flex>
                <v-flex xs12 sm12 md12>
                  <v-text-field v-model="editedItem.email" solo label="Email"></v-text-field>
                </v-flex>
                <v-flex xs12 sm12 md12>
                  <v-textarea solo name="input-7-4" label="Message" v-model="editedItem.message"></v-textarea>
                </v-flex>
                <v-flex xs12 sm12 md12>
                  <v-text-field v-model="editedItem.date" solo label="Date"></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click.native="close">Close</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-toolbar>
    <v-data-table
      :headers="headers"
      :items="computedMessages"
      :loading="loading"
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <td>{{ props.item.name }}</td>
        <td>{{(props.item.email || '').substring(0, 50) + '…'}}</td>
        <td>{{ props.item.message }}</td>
        <td>{{ props.item.date }}</td>
        <td class="justify-center layout px-0">
          <v-icon small class="mr-2" @click="viewDetails(props.item)">Details</v-icon>
          <v-icon small @click="deleteItem(props.item)">delete</v-icon>
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
import axios from "axios";

export default {
  layout: "admin-panel",
  middleware: "authenticated",
  data: () => ({
    dialog: false,
    valid: false,
    headers: [
      {
        text: "Name",
        align: "left",
        sortable: false,
        value: "name"
      },
      {
        text: "Email",
        align: "left",
        sortable: false,
        value: "email"
      },
      {
        text: "Message",
        align: "left",
        sortable: false,
        value: "message"
      },
      {
        text: "Date",
        align: "left",
        sortable: true,
        value: "date"
      },
      {
        text: "Action",
        align: "center",
        sortable: false
      }
    ],
    portfolios: [],
    editedIndex: -1,
    date: null,
    menu1: false,
    loading: false,
    editedItem: {
      name: "",
      email: "",
      message: "",
      date: new Date().toISOString()
    },
    pagination: {
      page: 1,
      rowsPerPage: 10
    },
    defaultItem: {
      name: "",
      email: "",
      message: "",
      date: new Date().toISOString()
    }
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Portfolio" : "Edit Portfolio";
    },
    computedMessages() {
      return this.$store.state.message.messageListResponse || [];
    },
    token() {
      return this.$store.state.auth.auth;
    },
    computedDateFormatted() {
      return this.formatDate(this.date);
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    date(val) {
      this.editedItem.date = this.formatDate(this.date);
    }
  },

  created() {
    this.initialize();
    axios.defaults.headers.common["Authorization"] = "Bearer " + this.token;
  },

  methods: {
    initialize() {
      this.loading = true;
      let paginationFilter = {};
      paginationFilter.sort = "date,desc";
      paginationFilter.size = this.pagination.rowsPerPage;
      paginationFilter.page = this.pagination.page - 1;

      this.$store
        .dispatch("message/fetchMessages", {
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
    viewDetails(item) {
      this.editedIndex = this.computedMessages.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      if (confirm("Are you sure you want to delete this portfolio?")) {
        return axios
          .delete("/messages/" + item.id)
          .then(response => {
            this.initialize();
          })
          .catch(errors => {
            console.error("Error occurred while deleting message");
          });
      }
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },
    formatDate(date) {
      if (!date) return null;
      date = date.substr(0, 10);
      const [year, month, day] = date.split("-");
      return `${year}-${month}-${day}` + `T12:01:14.915Z`;
    },
    parseDate(date) {
      if (!date) return null;
      date = date.substr(0, 10);
      const [year, month, day] = date.split("-");
      return (
        `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}` +
        `T12:01:14.915Z`
      );
    }
  }
};
</script>

