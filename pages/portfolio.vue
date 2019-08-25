<template>
  <v-container v-if="loading" fluid fill-height>
    <v-layout align-center justify-center>
      <v-progress-circular :indeterminate="loading" color="purple"></v-progress-circular>
    </v-layout>
  </v-container>
  <v-container v-else class="mt-5" grid-list-md text-xs-center>
    <v-layout row wrap align-center>
      <v-flex xs12 sm6 md4 v-for="portfolio in computedPortfolios" :key="portfolio.title">
        <div>
          <v-card hover>
            <v-img :src="portfolio.coverPhotoUrl" height="250" class="grey darken-4"></v-img>
            <v-card-title class="title">{{ portfolio.title }}</v-card-title>
            <v-card-text>
              <pre>
{{portfolio.description}}
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

axios.defaults.baseURL = "http://localhost:3000/api";

export default {
  head: {
    title: "Sopnopriyo - Software Engineering Portfolio",
    meta: [
      {
        hid: "description",
        name: "description",
        content:
          "This is my personal online portfolio website with all my favorite projects I have done."
      },
      { name: "og:title", content: "Sopnopriyo - Contact" },
      {
        name: "og:description",
        content:
          "This is my personal online portfolio website with all my favorite projects I have done."
      },
      { name: "og:type", content: "website" },
      { name: "og:url", content: "https://sopnopriyo.com/contact" },
      {
        name: "og:image",
        content: "https://sopnopriyo.com/img/opengraph/home/home.jpg"
      }
    ]
  },
  data: () => {
    return {
      portfolios: [],
      loading: true
    };
  },
  computed: {
    computedPortfolios() {
      return this.portfolios;
    }
  },
  created() {
    this.fetchPortfolios();
    this.loading = false;
  },
  methods: {
    fetchPortfolios() {
      axios.get("/portfolios").then(response => {
        this.portfolios = response.data;
      });
    }
  }
};
</script>

