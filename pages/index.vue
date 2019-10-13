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
          <!-- Blog Entries Column -->
          <div class="col-md-8">
            <!-- Blog Post -->
            <div class="card mb-4" v-for="post in posts" :key="post.id">
              <img class="card-img-top" :src="post.coverPhotoUrl" alt="Card image cap" />
              <div class="card-body">
                 <nuxt-link
                  :to="{ name: 'blog-slug', params: { slug: post.slug }}"
                >
                    <h2 class="card-title">{{post.title}}</h2>
                </nuxt-link>
                <p class="card-text" v-html="$md.render(post.excerpt)" label="Markdown Preview"></p>
              </div>
              <div class="card-footer text-muted">Posted on {{post.date}}</div>
            </div>
          </div>

          <!-- Sidebar Widgets Column -->
          <div class="col-md-4">
            <!-- Search Widget -->
            <div class="card my-4">
              <h5 class="card-header">Search</h5>
              <div class="card-body">
                <div class="input-group">
                  <input type="text" class="form-control" placeholder="Search for..." />
                  <span class="input-group-btn">
                    <button class="btn btn-secondary" type="button">Go!</button>
                  </span>
                </div>
              </div>
            </div>

            <!-- Categories Widget -->
            <!-- <div class="card my-4">
              <h5 class="card-header">Categories</h5>
              <div class="card-body">
                <div class="row">
                  <div class="col-lg-6">
                    <ul class="list-unstyled mb-0">
                      <li>
                        <a href="#">Web Design</a>
                      </li>
                      <li>
                        <a href="#">HTML</a>
                      </li>
                      <li>
                        <a href="#">Freebies</a>
                      </li>
                    </ul>
                  </div>
                  <div class="col-lg-6">
                    <ul class="list-unstyled mb-0">
                      <li>
                        <a href="#">JavaScript</a>
                      </li>
                      <li>
                        <a href="#">CSS</a>
                      </li>
                      <li>
                        <a href="#">Tutorials</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div> -->
            <CategoryWidget>
            </CategoryWidget>

            <!-- Side Widget -->
            <div class="card my-4">
              <h5 class="card-header">Side Widget</h5>
              <div
                class="card-body"
              >You can put anything you want inside of these side widgets. They are easy to use, and feature the new Bootstrap 4 card containers!</div>
            </div>
          </div>
        </div>
        <!-- /.row -->
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
 import CategoryWidget from './../components/CategoryWidget';

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
    let blogapi = context.app.$axios.$get("/api/blogs?sort=date,desc&size=4");
    return blogapi
      .then(response => {
        return {
          posts: response.content
        };
      })
      .catch(error => {
        console.log(error);
      });
  },
  components: {
     CategoryWidget
  },
};
</script>
