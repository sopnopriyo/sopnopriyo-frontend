<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="computedPortfolios"
      :server-items-length="to"
      class="elevation-1"
      :page.sync="pagination.page"
      :items-per-page="pagination.rowsPerPage"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>Portfolio</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <div class="flex-grow-1"></div>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on }">
              <v-btn color="primary" dark class="mb-2" v-on="on">New Post</v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="12" md="12">
                      <v-text-field v-model="editedItem.title" label="Title"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="12" md="12">
                      <v-text-field v-model="editedItem.url" label="URL"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="12" md="12">
                      <v-textarea outlined v-model="editedItem.description" label="Description"></v-textarea>
                    </v-col>
                    <v-col cols="12" sm="12" md="12">
                      <v-menu
                        ref="menu1"
                        v-model="menu1"
                        :close-on-content-click="false"
                        transition="scale-transition"
                        offset-y
                        lazy
                        full-width
                        max-width="290px"
                        min-width="290px"
                      >
                        <template v-slot:activator="{ on }">
                          <v-text-field
                            v-model="editedItem.date"
                            label="Date"
                            hint="YYYY/MM/DD format"
                            persistent-hint
                            :set="date = parseDate(editedItem.date)"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker v-model="date" no-title @input="menu1 = false"></v-date-picker>
                      </v-menu>
                    </v-col>

                    <v-col cols="12" sm="12" md="12">
                      <v-text-field v-model="editedItem.coverPhotoUrl" label="Cover Photo URL"></v-text-field>
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
        text: "Title",
        align: "left",
        sortable: true,
        value: "title"
      },
      {
        text: "URL",
        align: "left",
        sortable: false,
        value: "url"
      },
      {
        text: "Date",
        align: "left",
        sortable: true,
        value: "date"
      },
      {
        text: "Action",
        value: "action",
        align: "center",
        sortable: false
      }
    ],
    portfolios: [],
    editedIndex: -1,
    date: null,
    menu1: false,
    loading: false,
    pagination: {
      page: 1,
      rowsPerPage: 10
    },
    editedItem: {
      title: "",
      description: "",
      url: "",
      date: new Date().toISOString(),
      coverPhotoUrl: ""
    },
    defaultItem: {
      title: "",
      description: "",
      url: "",
      date: new Date().toISOString(),
      coverPhotoUrl: ""
    },
    formRules: {
      title: {
        rules: [v => !!v || "Title is required"]
      },
      description: {
        rules: [v => !!v || "Description is required"]
      },
      url: {
        rules: [v => !!v || "Url is required"]
      },
      date: {
        rules: [v => !!v || "Date is required"]
      },
      coverPhotoUrl: {
        rules: [v => !!v || "Cover Photo Url is required"]
      }
    }
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Portfolio" : "Edit Portfolio";
    },
    computedPortfolios() {
      return this.$store.state.portfolio.portfolioListResponse || [];
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
        .dispatch("portfolio/fetchPortfolios", {
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
      this.editedIndex = this.computedPortfolios.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      if (confirm("Are you sure you want to delete this portfolio?")) {
        return axios
          .delete("portfolios/" + item.id)
          .then(response => {
            this.initialize();
          })
          .catch(errors => {
            console.error("Error occurred while deleting portfolio");
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

    save() {
      let savePromise;
      if (this.editedIndex > -1) {
        savePromise = axios.put("/portfolios", this.editedItem);
      } else {
        savePromise = axios.post("/portfolios", {
          title: this.editedItem.title,
          description: this.editedItem.description,
          url: this.editedItem.url,
          date: this.editedItem.date,
          coverPhotoUrl: this.editedItem.coverPhotoUrl
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

