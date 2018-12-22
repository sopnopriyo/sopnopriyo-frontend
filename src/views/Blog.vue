<template>
	<v-container v-if="loading" fluid fill-height>
		<v-layout align-center justify-center>
			<v-progress-circular :indeterminate="loading" color="purple"></v-progress-circular>
		</v-layout>
	</v-container>
    <v-container v-else class="mt-5">
        <v-layout row wrap align-center>
            <v-flex xs12 md12>
                <div v-for="post in computedPosts" :key="post.title" class="mb-2">
                    <v-card hover>
                        <v-card-media class="white--text blur-bottom" :src="post.coverPhotoUrl" height="250px">
							<v-layout>
								<v-flex xs12 align-end d-flex>
									<span class="headline white--text title-text">{{ post.title }}</span>
								</v-flex>
                            </v-layout>
                        </v-card-media>
                        <v-card-text>
                            <div>
                                <span style="color:grey"> Created on </span>
                                <strong>{{(post.date ||'').substring(0,10)}}</strong>
                            </div>
							<pre>
{{ (post.body).substring(0,150) }} <router-link :to="{ name: 'singlepost', params: { id: post.id }}">Read More</router-link>
							</pre>
                        </v-card-text>
                    </v-card>
                </div>
            </v-flex>
        </v-layout>
    </v-container>
</template>
<style lang="scss" scoped>
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
    // font-weight: 400;
    // font-style: normal;
     font-size: 18px;
    // line-height: 1.58;
    // letter-spacing: -.003em;
}

.title-text {
 position: absolute;
  bottom: 0;
  background: rgb(0, 0, 0); /* Fallback color */
  background: rgba(0, 0, 0, 0.4); /* Black background with 0.5 opacity */
  color: #f1f1f1;
  width: 100%;
  border-radius: 3px;
  padding:3px;
}
</style>

<script>
import axios from 'axios';
axios.defaults.baseURL = process.env.VUE_APP_ROOT_API;

export default {
    data: () => {
        return {
			posts: [],
			loading: true,
        }
    },
    computed: {
        computedPosts() {
            return this.posts;
        },
    },
    created() {
		this.fetchPosts();
		this.loading = false;
    },
    methods: {
        fetchPosts() {
            axios.get("/posts")
                .then(response => {
					this.posts = response.data;
					// Set tags
					try {
						$("meta[property=\"og:title\"]")[0].content = 'Sopnopriyo - Blog';
						$("meta[property=\"og:url\"]")[0].content = window.location.href;
						$("meta[property=\"og:description\"]")[0].content = 'Read articles from Sopnopriyo regularly about many exciting web technologies';
						// Overwrite

					} catch (e) {
						console.error("Error setting meta tags: ", e);
					}
                })
        }
    }
}
</script>

