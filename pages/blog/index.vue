<template>
  <div>
    <header class="jumbotron text-center">
      <div class="header-content">
        <h1>
          Tech research findings, reviews, stories and updates from
          <nuxt-link to="/blog">Sopnopriyo !</nuxt-link>
        </h1>
      </div>
    </header>
    <main>
      <!-- Page Content -->
      <div class="container">
        <div class="row">
          <div
            class="col-12 col-sm-8 col-md-6 col-lg-4 d-flex align-items-stretch"
            v-for="post in posts"
            :key="post.id"
          >
            <div class="card">
              <img class="card-img" :src="post.coverPhotoUrl" :alt="post.title" />
              <div class="card-body">
                <nuxt-link :to="{ name: 'blog-slug', params: { slug: post.slug }}">
                  <h4 class="card-title">{{post.title}}</h4>
                </nuxt-link>
                <div
                  class="card-footer text-muted d-flex justify-content-between bg-transparent border-top-0"
                >
                  <div class="views">Posted on {{post.date}}</div>
                </div>
                <p class="card-text" v-html="$md.render(post.excerpt)" />
                <nuxt-link
                  class="card-read-more"
                  :to="{ name: 'blog-slug', params: { slug: post.slug }}"
                >Read More</nuxt-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="scss" scoped>
</style>
<script>
//import axios from "axios";

export default {
  head: {
    title:
      "Sopnopriyo - Tech research findings, reviews, stories and updates from Sopnopriyo !",
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
        content:
          "Sopnopriyo - Tech research findings, reviews, stories and updates from Sopnopriyo !"
      },
      {
        hid: "og:description",
        name: "og:description",
        content:
          "Sopnopriyo helps Software Engineers by sharing real life engineering chalenges and solutions"
      },
      {
        hid: "og:type",
        name: "og:type",
        content: "website"
      },
      { hid: "og:url", name: "og:url", content: "https://sopnopriyo.com/" },
      {
        hid: "og:image",
        name: "og:image",
        content: "https://sopnopriyo.com/img/opengraph/home.jpg"
      }
    ]
  },
  async asyncData(context) {
    // fetch the post from the API
    let blogapi = context.app.$axios.$get("/api/blogs?sort=date,desc&size=100");
    return blogapi
      .then(response => {
        let content = response.content;

        for (var i = 0; i < content.length; i++) {
          const date = new Date(content[i].date);
          content[i].date =
            date.toLocaleString("default", { month: "short" }) +
            " " +
            date.getDate() +
            ", " +
            date.getFullYear();
        }
        return {
          posts: content
        };
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>
