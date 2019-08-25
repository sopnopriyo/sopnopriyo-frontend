<template>
  <v-container class="mt-5">
    <v-layout row wrap align-center>
      <v-flex>
        <div>
          <v-card hover>
            <v-img :src="post.coverPhotoUrl" class="grey darken-4"></v-img>
            <v-card-title class="title">{{ post.title }}</v-card-title>
            <v-card-text>
              <div>
                <span style="color:grey">Created on</span>
                <strong>{{(post.date ||'').substring(0,10)}}</strong>
              </div>
              <pre>
	{{ post.body }}
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
  white-space: pre-wrap;
  /* Since CSS 2.1 */
  white-space: -moz-pre-wrap;
  /* Mozilla, since 1999 */
  white-space: -pre-wrap;
  /* Opera 4-6 */
  white-space: -o-pre-wrap;
  /* Opera 7 */
  word-wrap: break-word;
  /* Internet Explorer 5.5+ */
  text-align: justify;
  text-justify: inter-word;
  font-family: medium-content-serif-font, Georgia, Cambria, "Times New Roman",
    Times, serif;
  letter-spacing: 0.01rem;
  font-weight: 400;
  font-style: normal;
  font-size: 22px;
  line-height: 1.58;
  letter-spacing: -0.003em;
}

.title-text {
  position: absolute;
  bottom: 0;
  background: rgb(0, 0, 0);
  /* Fallback color */
  background: rgba(0, 0, 0, 0.4);
  /* Black background with 0.5 opacity */
  color: #f1f1f1;
  width: 100%;
  border-radius: 3px;
  padding: 3px;
  font-size: 30px;
}
</style>
<script>
import axios from "axios";
axios.defaults.baseURL = "http://localhost:3000/api";

export default {
  head() {
    return {
      title: this.post.title,
      meta: [
        {
          hid: "description",
          name: "description",
          content:
            "Sopnopriyo helps Software Engineers by sharing real life engineering chalenges and solutions"
        },
        { name: "og:title", content: this.post.title },
        {
          name: "og:description",
          content:
            "Sopnopriyo helps Software Engineers by sharing real life engineering chalenges and solutions"
        },
        { name: "og:type", content: "website" },
        {
          name: "og:url",
          content: "https://sopnopriyo.com/blog/" + this.post.slug
        },
        {
          name: "og:image",
          content: this.post.coverPhotoUrl
        }
      ]
    };
  },
  data: () => {
    return {
      post: {},
      currentPostSlug: ""
    };
  },
  created() {
    this.currentPostSlug = this.$route.params.slug;
    this.fetchPost();
  },
  methods: {
    fetchPost() {
      if (this.currentPostSlug) {
        axios.get("/blogs/" + this.currentPostSlug).then(response => {
          this.post = response.data;
        });
      }
    }
  },
  watch: {
    "$route.params.slug": {
      handler() {
        if (this.$route.params.slug != undefined) {
          this.currentPostSlug = this.$route.params.slug;
          this.fetchPost();
        }
      },
      deep: true,
      immediate: true
    }
  }
};
</script>

