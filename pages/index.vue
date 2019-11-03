<template>
  <div>
    <header class="masthead">
      <div class="container">
        <div class="row">
          <div class="col-md-4 col-xs-12 align-self-center">
            <h1>Hi, I'm Shahin. I'm a Software Engineer based in Singapore.</h1>
            <nuxt-link class="btn btn-info" to="/blog">Learn More</nuxt-link>
          </div>
          <div class="col-md-8 col-xs-12">
            <img class="img-fluid" src="~/assets/images/shahin-at-work.png" alt="Shahin at Work" />
          </div>
        </div>
      </div>
    </header>
    <main>
      <div class="container">
        <!-- Blog Post Section -->
        <section>
          <h2>Latest Posts</h2>
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
                  <p class="card-text" v-html="$md.render(post.excerpt)" />
                  <nuxt-link
                    class="btn btn-info"
                    :to="{ name: 'blog-slug', params: { slug: post.slug }}"
                  >Read More</nuxt-link>
                </div>
                <div
                  class="card-footer text-muted d-flex justify-content-between bg-transparent border-top-0"
                >
                  <div class="views">Posted on {{post.date}}</div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <hr />
      </div>
    </main>
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="scss" scoped>
h1 {
  font-size: 35px;
}
.masthead {
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
.card-img {
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 0px;
}

.card-title {
  margin-bottom: 0.3rem;
}

.cat {
  display: inline-block;
  margin-bottom: 1rem;
}

.fa-users {
  margin-left: 1rem;
}

.card-footer {
  font-size: 0.8rem;
}
</style>
<script>
import CategoryWidget from "./../components/CategoryWidget";

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
    let blogapi = context.app.$axios.$get("/api/blogs?sort=date,desc&size=3");
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
  },
  components: {
    CategoryWidget
  }
};
</script>
