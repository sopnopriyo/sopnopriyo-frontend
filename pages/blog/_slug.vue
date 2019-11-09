<template>
  <!-- Page Content -->
  <div class="container">
    <div class="row">
      <!-- Post Content Column -->
      <div class="col-12">
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
        <div v-html="$md.render(post.body)" label="Markdown Preview" class="content-body"></div>
      </div>
    </div>
    <!-- /.row -->
  </div>
  <!-- /.container -->
</template>
<style lang="scss">
dl, ol, ul  {
  margin-left: 15px;
}
pre{
  counter-reset:line-numbering;
  background:#2c3e50;
  padding:12px 0px 14px 13px;
  color:#ecf0f1;
  line-height:140%;
    .line::before {
      content: counter(line-numbering);
      counter-increment: line-numbering;
      padding-right: 1em;
      /* space after numbers */
      padding-left:8px;
      width: 1.5em;
      text-align: right;
      opacity: 0.5;
      color:white;
  }

  code {
    margin: 10px;
  }
}

img {
  width: 100%;
  box-shadow: 0 .5rem 1rem rgba(0,0,0,.15)!important;
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
        res.date =
          date.toLocaleString("default", { month: "short" }) +
          " " +
          date.getDate() +
          ", " +
          date.getFullYear();
        return { post: res };
      });
  }
};
</script>

