<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="computedPosts"
      :server-items-length="totalPostSize"
      class="elevation-1"
      :page.sync="pagination.page"
      :items-per-page="pagination.rowsPerPage"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>Blog</v-toolbar-title>
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
                      <v-text-field
                        v-model="editedItem.slug"
                        :set="editedItem.slug = getSlugFromTitle(editedItem.title)"
                        label="Slug"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="12" md="12">
                      <v-textarea outlined v-model="editedItem.body" label="Body"></v-textarea>
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
                      <v-select
                        :items="statusOptions"
                        v-model="editedItem.status"
                        :rules="formRules.body.rules"
                        label="Status"
                        outlined
                      ></v-select>
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
.blog-image-upload {
  max-width: 100%;
  overflow: hidden;
}
</style>
<script>
import axios from "axios";
axios.defaults.baseURL =
  process.env.NODE_ENV === "development"
    ? process.env.DEV_API
    : process.env.PROD_API;

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
        sortable: false,
        value: "title"
      },
      {
        text: "Status",
        align: "left",
        sortable: true,
        value: "status"
      },
      {
        text: "Date",
        align: "left",
        sortable: true,
        value: "date"
      },

      { text: "Actions", value: "action", sortable: false }
    ],
    statusOptions: ["DRAFT", "PUBLISHED"],
    posts: [],
    editedIndex: -1,
    date: new Date().toISOString().substr(0, 10),
    menu1: false,
    dateFormatted: "",
    pagination: {
      page: 1,
      rowsPerPage: 10
    },
    loading: false,
    editedItem: {
      title: "",
      body: "",
      status: "DRAFT",
      slug: "",
      date: new Date().toISOString(),
      coverPhotoUrl: ""
    },
    defaultItem: {
      title: "",
      body: "",
      status: "DRAFT",
      slug: "",
      date: new Date().toISOString(),
      coverPhotoUrl: ""
    },
    formRules: {
      title: {
        rules: [v => !!v || "Title is required"]
      },
      slug: {
        rules: [v => !!v || "Slug is required"]
      },
      body: {
        rules: [v => !!v || "Body is required"]
      },
      status: {
        rules: [v => !!v || "Status is required"]
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
      return this.editedIndex === -1 ? "New Post" : "Edit Post";
    },
    computedPosts() {
      if (this.$store.state.blog.postListResponse) {
        return this.$store.state.blog.postListResponse.content || [];
      }
    },
    token() {
      return this.$store.state.auth.auth;
    },
    computedDateFormatted() {
      return this.formatDate(this.date);
    },
    totalPostSize() {
      if (this.$store.state.blog.postListResponse) {
        return this.$store.state.blog.postListResponse.totalElements || 0;
      }
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    date(val) {
      this.editedItem.date = this.formatDate(this.date);
    },
    pagination: {
      handler() {
        this.initialize();
      },
      deep: true
    }
  },

  created() {
    this.initialize();
    this.defaultItem.slug = this.computedSlug;
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
        .dispatch("blog/fetchPosts", {
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
      this.editedIndex = this.computedPosts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      if (confirm("Are you sure you want to delete this post?")) {
        return axios
          .delete("/posts/" + item.id)
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
        savePromise = axios.put("/posts", this.editedItem);
      } else {
        savePromise = axios.post("/posts", {
          title: this.editedItem.title,
          slug: this.editedItem.slug,
          body: this.editedItem.body,
          status: this.editedItem.status,
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
    },
    getSlugFromTitle(title) {
      return title
        .toString()
        .toLowerCase()
        .replace(/ /g, "-")
        .replace(/[^\w-]+/g, "");
    }
  }
};
</script>

