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
      <div class="wrapper">
        <section class="recent-blog">
          <h2 class="section_title">Recent Articles</h2>
          <div v-if="featuredPost" class="article featured-post">
            <div>
              <nuxt-link :to="{ name: 'blog-slug', params: { slug: featuredPost.slug }}">
                <img :src="featuredPost.coverPhotoUrl" alt />
              </nuxt-link>
            </div>
            <div>
              <h2 class="title">
                <nuxt-link
                  :to="{ name: 'blog-slug', params: { slug: featuredPost.slug }}"
                >{{featuredPost.title}}</nuxt-link>
              </h2>
            </div>
          </div>

          <div v-if="posts" class="articles">
            <div class="article" v-for="post in posts" :key="post.title">
              <div class="preview">
                <div class="stretch">
                  <nuxt-link :to="{ name: 'blog-slug', params: { slug: post.slug }}">
                    <img :src="post.coverPhotoUrl" :alt="post.title" />
                  </nuxt-link>
                </div>
              </div>
              <h2 class="title">
                <nuxt-link :to="{ name: 'blog-slug', params: { slug: post.slug }}">{{post.title}}</nuxt-link>
              </h2>
            </div>
          </div>
        </section>
        <hr />
        <section class="recent-portfolio">
          <h2 class="section_title">Recent Projects</h2>

          <div v-if="featuredPortfolio" class="article featured-post">
            <div>
              <img :src="featuredPortfolio.coverPhotoUrl" alt />
            </div>
            <div>
              <h2 class="title">
                <nuxt-link to="/portfolio">{{featuredPortfolio.title}}</nuxt-link>
              </h2>
            </div>
          </div>

          <div class="articles" v-if="portfolios">
            <div class="article" v-for="portfolio in portfolios" :key="portfolio.title">
              <div class="preview">
                <div class="stretch">
                  <nuxt-link to="/portfolio">
                    <img :src="portfolio.coverPhotoUrl" alt="Article Image" />
                  </nuxt-link>
                </div>
              </div>

              <nuxt-link to="/portfolio">
                <h2 class="title">{{portfolio.title}}</h2>
              </nuxt-link>
            </div>
          </div>
        </section>
      </div>
    </main>
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="scss" scoped>
.wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 1200px;
  margin: 0 auto;
}

.section_title {
  margin-top: 3rem;
  margin-bottom: 4rem;
}

img {
  width: 100%;
  height: auto;
  margin: 0;
}

.featured-post {
  flex-direction: row !important;
  padding: 0px !important;

  @include sm {
    flex-direction: column !important;
  }

  @include md {
    flex-direction: row;
  }

  @include lg {
    flex-direction: column;
  }

  img {
    width: 97%;
    height: 100%;

    @include sm {
      width: 100%;
    }

    @include md {
      width: 97%;
    }

    @include lg {
      width: 97%;
    }
  }
}
.articles {
  width: 100%;
  display: grid;
  grid-gap: 25px;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  flex-wrap: wrap;
  margin-bottom: 5rem;
}

.article {
  display: flex;
  flex-direction: column;
  flex-basis: 0;
  flex-grow: 1;
  padding: 2rem;
  background-color: #e6e8eb;
  margin-top: 3rem;
  &:hover {
    img {
      transform: scale(1.05);
    }

    .read_more {
      opacity: 1;
      z-index: 1;
    }

    .author {
      opacity: 0;
      z-index: -1;
    }
  }

  a {
    color: #333;
  }

  .preview {
    position: relative;
    margin-bottom: 1.3rem;
    overflow: hidden;
    margin-top: -4rem;
    width: 100%;
    padding-bottom: 50%;
    .stretch {
      position: absolute;
    }
    img {
      vertical-align: middle;
      transition: all 0.25s ease-in-out;
    }
  }

  .cat {
    margin-bottom: 1rem;
    padding: 0.4rem 0.5rem;
    align-self: flex-start;
    width: fit-content;
    a {
      color: #fff;
      text-decoration: none;
    }
    transition: all 0.3s;
  }

  .title {
    font-size: 2rem;
    margin-bottom: 1.5rem;

    a {
      text-decoration: none;
    }
  }
}
</style>
<script>
import axios from "axios";

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
    let blogapi = axios.get("/blogs?sort=date,desc&size=4", {
      headers: { "Access-Control-Allow-Origin": "*" }
    });

    let portfolioApi = axios.get("/portfolios?sort=date,desc&size=4");

    let [blogRes, portfolioRes] = await Promise.all([blogapi, portfolioApi]);

    return {
      posts: blogRes.data.content.slice(1, blogRes.data.content.length),
      featuredPost: blogRes.data.content[0],
      portfolios: portfolioRes.data.slice(1, portfolioRes.data.length),
      featuredPortfolio: portfolioRes.data[0]
    };
  }
};
</script>
