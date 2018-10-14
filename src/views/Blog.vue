<template>
    <v-container class="mt-5">
        <v-flex xs12>
            <v-layout row class="mt-3">
                <v-flex xs12>
                    <v-card flat v-for="post in computedPosts" :key="post.id" class="grey--text text--darken-2">
                        <span style="font-size:32px;" class="mt-3">{{ post.title }}</span>
                        <div class="mt-3">
                            <span style="color:grey"> Created on </span>
                            <strong>{{post.date}}</strong>
                        </div>
                        <v-img :src="'data:'+post.coverImageContentType+';base64,'+post.coverImage" height="400px" class="mt-3"></v-img>
                        <v-card-text style="font-size:16px;">{{(post.body || '').substring(0, 100) + '…'}}</v-card-text>
                        <v-card-actions class="mb-3">
                            <v-btn :href="post.link" flat style="color:#5277AC;">READ MORE</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-flex>
    </v-container>
</template>
<script>
import axios from 'axios';
axios.defaults.baseURL = process.env.VUE_APP_ROOT_API;

export default {
    data: () => {
        return {
            posts: []
        }
    },
    computed: {
        computedPosts() {
            return this.posts;
        },
    },
    created() {
        this.fetchPosts();
    },
    methods: {
        fetchPosts() {
            axios.get("/posts")
                .then(response => {
                    this.posts = response.data;
                })
        }
    }
}
</script>

