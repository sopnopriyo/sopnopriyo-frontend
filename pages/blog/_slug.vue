<template>
  <!-- Page Content -->
  <div class="container">
    <div class="row">
      <!-- Post Content Column -->
      <div class="col-lg-8">
        <!-- Title -->
        <h1 class="mt-4">{{post.title}}</h1>

        <!-- Author -->
        <p class="lead">
          by
          <a href="#">Sopnopriyo</a>
        </p>

        <hr />

        <!-- Date/Time -->
        <p>Posted on {{post.date}}</p>

        <hr />

        <!-- Preview Image -->
        <img class="img-fluid rounded" :src="post.coverPhotoUrl" alt />

        <hr />

        <!-- Post Content -->
        <div v-html="$md.render(post.body)" label="Markdown Preview"></div>
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
      </div>
    </div>
    <!-- /.row -->
  </div>
  <!-- /.container -->
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
export default {
  head() {
    return {
      title: this.post.title,
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.post.excerpt
        },
        { hid: "og:title", name: "og:title", content: this.post.title },
        {
          hid: "og:description",
          name: "og:description",
          content: this.post.excerpt
        },
        { hid: "og:type", name: "og:type", content: "website" },
        {
          hid: "og:url",
          name: "og:url",
          content: "https://sopnopriyo.com/blog/" + this.post.slug
        },
        {
          hid: "og:image",
          name: "og:image",
          content: this.post.coverPhotoUrl
        }
      ]
    };
  },
  data() {
    return {
      post: {}
    };
  },
  async asyncData(context) {
    // fetch the post from the API
    return context.app.$axios
      .$get(`/api/blogs/${context.params.slug}`)
      .then(res => {
         const date = new Date(res.date);
         res.date = date.toLocaleString('default', { month: 'short' }) + " " + date.getDate() +", "+ date.getFullYear();
        return { post: res };
      });
  }
};
</script>

