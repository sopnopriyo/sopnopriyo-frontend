<template>
  <div>
    <header class="jumbotron text-center">
      <div class="header-content">
        <h1>Learn more about my projects and research works</h1>
      </div>
    </header>
    <article>
      <div class="container">
        <div class="row">
          <div class="col-12 col-sm-8 col-md-6 col-lg-4 d-flex align-items-stretch" v-for="portfolio in computedPortfolios" :key="portfolio.id">
            <div class="card">
              <img class="card-img" :src="portfolio.coverPhotoUrl" :alt="portfolio.title">
              <div class="card-body">
                <h4 class="card-title">{{portfolio.title}}</h4>
                <p class="card-text" v-html="$md.render(portfolio.description)"/>
              </div>
              <div class="card-footer text-muted d-flex justify-content-between bg-transparent border-top-0">
                <div class="views">Posted on {{portfolio.date}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  </div>
</template>
<style lang="scss" scoped>
</style>

<script>
export default {
  head: {
    title: "Sopnopriyo - Software Engineering Portfolio",
    meta: [
      {
        hid: "description",
        name: "description",
        content:
          "My personal online portfolio website with all my favorite projects I have done."
      },
      {
        hid: "og:title",
        name: "og:title",
        content: "Sopnopriyo - Software Engineering Portfolio"
      },
      {
        hid: "og:description",
        name: "og:description",
        content:
          "My personal online portfolio website with all my favorite projects I have done."
      },
      {
        hid: "og:type",
        name: "og:type",
        content: "website"
      },
      { name: "og:url", content: "https://sopnopriyo.com/portfolio" },
      {
        hid: "og:image",
        name: "og:image",
        content: "https://sopnopriyo.com/img/opengraph/home.jpg"
      }
    ]
  },
  async asyncData(context) {
    // fetch the post from the API
    return context.app.$axios
      .$get("/api/portfolios?sort=date,desc")
      .then(res => {
        return { computedPortfolios: res.content };
      });
  }
};
</script>

