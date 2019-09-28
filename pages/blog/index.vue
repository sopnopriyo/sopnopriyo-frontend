<template>
  <div>
    <header class="jumbotron text-center">
      <div class="header-content">
        <h1>Read Software Engineering Blogs</h1>
      </div>
    </header>
    <v-container class="mt-5" grid-list-md text-xs-center>
      <v-layout row wrap align-center>
        <v-flex xs12 sm6 md6 v-for="post in computedPosts" :key="post.title">
          <div>
            <v-card hover>
              <v-img :src="post.coverPhotoUrl" height="250" class="grey darken-4"></v-img>
              <v-card-title class="title">{{ post.title }}</v-card-title>
              <v-card-text>
                <div>
                  <span style="color:grey">Created on</span>
                  <strong>{{(post.date ||'').substring(0,10)}}</strong>
                </div>
                <pre>
{{ (post.body).substring(0,150) }}
                <nuxt-link
  :to="{ name: 'blog-slug', params: { slug: post.slug }}"
>Read More</nuxt-link>'

<!-- <a :href="'blog/'+post.slug">Read More</a> -->
							</pre>
              </v-card-text>
            </v-card>
          </div>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>
<style lang="scss" >
pre {
  white-space: pre-wrap; /* Since CSS 2.1 */
  white-space: -moz-pre-wrap; /* Mozilla, since 1999 */
  white-space: -pre-wrap; /* Opera 4-6 */
  white-space: -o-pre-wrap; /* Opera 7 */
  word-wrap: break-word; /* Internet Explorer 5.5+ */
  text-align: justify;
  text-justify: inter-word;
  font-family: medium-content-serif-font, Georgia, Cambria, "Times New Roman",
    Times, serif;
  letter-spacing: 0.01rem;
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
  padding: 3px;
}
</style>

<script>
import axios from "axios";
axios.defaults.baseURL =
  process.env.NODE_ENV === "development"
    ? process.env.DEV_API
    : process.env.PROD_API;

export default {
  head: {
    title: "Sopnopriyo - Read Software Engineering Blogs",
    meta: [
      {
        hid: "description",
        name: "description",
        content:
          "Sopnopriyo helps Software Engineers by sharing real life engineering chalenges and solutions"
      },
      {
        hid: "og:title",
        name: "og:title",
        content: "Sopnopriyo - Read Software Engineering Blogs"
      },
      {
        hid: "og:description",
        name: "og:description",
        content:
          "Sopnopriyo helps Software Engineers by sharing real life engineering chalenges and solutions"
      },
      { hid: "og:type", name: "og:type", content: "website" },
      {
        hid: "og:url",
        name: "og:url",
        content: "https://sopnopriyo.com/blog"
      },
      {
        hid: "og:image",
        name: "og:image",
        content: "https://sopnopriyo.com/img/opengraph/home.jpg"
      }
    ]
  },
  async asyncData(context) {
    // fetch the post from the API
    return axios
      .get("/blogs?sort=date,desc", {
        headers: { "Access-Control-Allow-Origin": "*" }
      })
      .then(res => {
        return { computedPosts: res.data.content };
      });
  }
};
</script>

