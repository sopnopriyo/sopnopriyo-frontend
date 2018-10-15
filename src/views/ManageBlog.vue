<template>
    <div>
        <v-toolbar flat color="light">
            <v-toolbar-title>Posts</v-toolbar-title>
            <v-divider class="mx-2" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="700px">
                <v-btn slot="activator" color="primary" dark class="mb-2">New Post</v-btn>
                <v-card>
                    <v-card-title>
                        <span class="headline">{{ formTitle }}</span>
                    </v-card-title>
                    <v-card-text>
                        <v-container grid-list-md>
                            <v-layout wrap>
                                <v-flex xs12 sm12 md12>
                                    <v-text-field v-model="editedItem.title" label="Title"></v-text-field>
                                </v-flex>
                                <v-flex xs12 sm12 md12>
                                    <v-textarea solo name="input-7-4" label="Body" v-model="editedItem.body"></v-textarea>
                                </v-flex>
                                <v-flex xs12 sm12 md12>
                                    <v-select :items="statusOptions" v-model="editedItem.status" label="Status"></v-select>
                                </v-flex>
                                <v-flex xs12 lg6>
                                    <v-menu ref="menu1" :close-on-content-click="false" v-model="menu1" :nudge-right="40"
                                        lazy transition="scale-transition" offset-y full-width max-width="290px"
                                        min-width="290px">
                                        <v-text-field slot="activator" v-model="editedItem.date" label="Date" hint="YYYY/MM/DD format"
                                            persistent-hint @blur="date = parseDate(editedItem.date)"></v-text-field>
                                        <v-date-picker v-model="date" no-title @input="menu1 = false"></v-date-picker>
                                    </v-menu>
                                </v-flex>
                                <v-flex xs12 sm12 md12>
                                    <div class="v-input v-text-field theme--dark">
                                        <div class="v-input__control">
                                            <div class="v-input__slot">
                                                <div class="v-text-field__slot">
                                                    <label aria-hidden="true" class="v-label theme--dark" style="left: 0px; right: auto; position: absolute;"></label>
                                                    <input aria-label="image" type="file" @change="onFileChange">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <!-- "data:image/jpg;base64," + baseStr64 -->
                                        <img :src="'data:'+editedItem.coverImageContentType+';base64,'+editedItem.coverImage"
                                            class="blog-image-upload">
                                        <input type="hidden" v-model="editedItem.coverImage">
                                        <input type="hidden" v-model="editedItem.coverImageContentType">
                                    </div>
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
        <v-data-table :headers="headers" :items="computedPosts" :loading="loading" hide-actions class="elevation-1">
            <template slot="items" slot-scope="props">
                <td>{{ props.item.title }}</td>
                <td>{{(props.item.body || '').substring(0, 50) + '…'}}</td>
                <td>{{ props.item.status }}</td>
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
.blog-image-upload {
    max-width: 100% ;
	overflow: hidden;
}
</style>
<script>
import axios from 'axios';
axios.defaults.baseURL = process.env.VUE_APP_ROOT_API;

export default {
    data: () => ({
        dialog: false,
        headers: [{
                text: 'Title',
                align: 'left',
                sortable: false,
                value: 'title'
            },
            {
                text: 'Body',
                align: 'left',
                sortable: false,
                value: 'body'
            },
            {
                text: 'Status',
                align: 'left',
                sortable: false,
                value: 'status'
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
        statusOptions: [
            "DRAFT", "PUBLISHED"
        ],
        posts: [],
        editedIndex: -1,
        date: null,
		menu1: false,
		loading: false,
        editedItem: {
            title: '',
            body: "",
			status: "",
			date: (new Date()).toISOString(),
            coverImage: [],
            coverImageB64: '',
			coverImageContentType: null,
        },
        defaultItem: {
            title: '',
            body: "",
			status: "",
			date: (new Date()).toISOString(),
            coverImage: [],
            coverImageB64: '',
            coverImageContentType: null,
        }
    }),

    computed: {
        formTitle() {
            return this.editedIndex === -1 ? 'New Post' : 'Edit Post';
        },
        computedPosts() {
            return this.$store.getters.postList || [];
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

			this.$store.dispatch('fetchPosts')
			.then(response => {
				this.loading = false;
			})
			.catch(err => {
				this.loading = false;
			})
        },

        editItem(item) {

            this.editedIndex = this.computedPosts.indexOf(item);
            this.editedItem = Object.assign({}, item);
            this.dialog = true;
        },

        deleteItem(item) {
            if (confirm('Are you sure you want to delete this post?')) {
                return axios.delete('/posts/' + item.id)
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
                savePromise = axios.put('/posts', this.editedItem)
            } else {
                savePromise = axios.post('/posts', {
                    title: this.editedItem.title,
                    body: this.editedItem.body,
                    status: this.editedItem.status,
                    date: this.editedItem.date,
                    coverImage: this.editedItem.coverImage || [],
                    authorities: this.editedItem.authorities,
                    coverImageContentType: this.editedItem.coverImageContentType || "image/png"
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
        },
        onFileChange(e) {
            var files = e.target.files || e.dataTransfer.files;
            if (!files.length)
                return;
            this.createImage(files[0]);
        },
        createImage(file) {
            this.editedItem.coverImageContentType = file.type
            var reader = new FileReader();

            var byteArrayImg = []
            reader.onload = (e) => {
                this.editedItem.coverImage = e.target.result;
                var byteArray = e.target.result;
                var bytes = new Uint8Array(byteArray);
                for (var i = 0; i < bytes.length; i++) {
                    byteArrayImg.push(bytes[i]);
                }
                this.editedItem.coverImage = byteArrayImg
            };
            reader.readAsArrayBuffer(file)
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

