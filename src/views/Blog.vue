<template>
    <v-container class="mt-5">
        <v-layout row wrap align-center>
            <v-flex xs12 md12>
                <div v-for="post in computedPosts" :key="post.title" class="mb-2">
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
							<pre>
{{ post.body }}
							</pre>
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
<style lang="scss">
pre {
    white-space: pre-wrap;       /* Since CSS 2.1 */
    white-space: -moz-pre-wrap;  /* Mozilla, since 1999 */
    white-space: -pre-wrap;      /* Opera 4-6 */
    white-space: -o-pre-wrap;    /* Opera 7 */
    word-wrap: break-word;       /* Internet Explorer 5.5+ */
	text-align: justify;
    text-justify: inter-word;
	font-family: medium-content-serif-font,Georgia,Cambria,"Times New Roman",Times,serif;
    letter-spacing: .01rem;
    font-weight: 400;
    font-style: normal;
    font-size: 21px;
    line-height: 1.58;
    letter-spacing: -.003em;
}
</style>

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

