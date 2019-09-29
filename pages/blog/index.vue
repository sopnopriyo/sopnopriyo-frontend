<template>
  <div>
    <header class="jumbotron text-center">
      <div class="header-content">
        <h1>Read Software Engineering Blogs</h1>
      </div>
    </header>
    <main class="container">
      <div class="row">
        <div class="col-sm-6" v-for="post in computedPosts" :key="post.title">
          <div class="card">
            <nuxt-link :to="{ name: 'blog-slug', params: { slug: post.slug }}">
              <img class="card-img-top" :src="post.coverPhotoUrl" :alt="post.title" />
            </nuxt-link>

            <div class="card-body">
              <h2 class="title">
                <nuxt-link :to="{ name: 'blog-slug', params: { slug: post.slug }}">{{post.title}}</nuxt-link>
              </h2>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
<style lang="scss" >
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

