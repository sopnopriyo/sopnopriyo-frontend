<template>
    <v-container class="mt-5">
        <v-layout row wrap align-center>
            <v-flex xs12 md12>
                <div v-for="post in computedPosts" :key="post.title">
                    <v-card hover>
                        <v-card-media class="white--text" height="350px" :src="'data:'+post.coverImageContentType+';base64,'+post.coverImage">
                            <v-container fill-height fluid>
                                <v-layout>
                                    <v-flex xs12 align-end d-flex>
                                        <span class="headline black--text">{{ post.title }}</span>
                                    </v-flex>
                                </v-layout>
                            </v-container>
                        </v-card-media>
                        <v-card-text>
                            <div>
                                <span style="color:grey"> Created on </span>
                                <strong>{{(post.date ||'').substring(0,10)}}</strong>
                            </div>
                            {{ post.body }}
                        </v-card-text>
                        <v-card-actions>
                            <v-btn icon class="blue--text">
                                <v-icon medium> fab fa-facebook</v-icon>
                            </v-btn>
                            <v-spacer></v-spacer>
                            <v-btn flat class="blue--text">Read More</v-btn>
                        </v-card-actions>
                    </v-card>
                </div>
            </v-flex>
        </v-layout>
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

