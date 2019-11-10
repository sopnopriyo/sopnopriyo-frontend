<template>
  <div class="about">
    <h1>Statistics</h1>

    <div class="row ml-1 mr-1">
      <div class="col-md-4">
          <div class="card border-info mx-sm-1 p-3">
              <div class="card border-info shadow text-info p-3 dashboard-stats-card" ><span class="fa fa-newspaper-o" aria-hidden="true"></span></div>
              <div class="text-info text-center mt-3"><h4>Blogs</h4></div>
              <div class="text-info text-center mt-2"><h1>{{totalPosts}}</h1></div>
          </div>
      </div>
      <div class="col-md-4">
          <div class="card border-success mx-sm-1 p-3">
              <div class="card border-success shadow text-success p-3 dashboard-stats-card"><span class="fa fa-briefcase" aria-hidden="true"></span></div>
              <div class="text-success text-center mt-3"><h4>Portfolio</h4></div>
              <div class="text-success text-center mt-2"><h1>{{totalPortfolios}}</h1></div>
          </div>
      </div>
      <div class="col-md-4">
          <div class="card border-danger mx-sm-1 p-3">
              <div class="card border-danger shadow text-danger p-3 dashboard-stats-card" ><span class="fa fa-envelope" aria-hidden="true"></span></div>
              <div class="text-danger text-center mt-3"><h4>Message</h4></div>
              <div class="text-danger text-center mt-2"><h1>{{totalMessages}}</h1></div>
          </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.dashboard-stats-card
{
    position:absolute;
    left:40%;
    top:-20px;
    border-radius:50%;
}
</style>
<script>
export default {
  layout: "admin-panel",
  middleware: "authenticated",
  data: () => ({ 
     pagination: {
      page: 1,
      rowsPerPage: 10
    },
  }),
  created() {

      let paginationFilter = {};
      paginationFilter.sort = "date,desc";
      paginationFilter.size = this.pagination.rowsPerPage;
      paginationFilter.page = this.pagination.page - 1;

      this.$store
        .dispatch("blog/fetchPosts", {
          token: this.$store.state.auth.auth,
          pagination: paginationFilter
        });

        this.$store
        .dispatch("portfolio/fetchPortfolios", {
          token: this.$store.state.auth.auth,
          pagination: paginationFilter
        });
        
        this.$store
        .dispatch("message/fetchMessages", {
          token: this.$store.state.auth.auth,
          pagination: paginationFilter
        });
  },
  computed: {
    authUser() {
      return this.$store.state.auth.auth;
    },
    totalPosts () {
      if(this.$store.state.blog.postListResponse && this.$store.state.blog.postListResponse.totalElements) {
        return this.$store.state.blog.postListResponse.totalElements 
      }
      return 0;
    },
    totalPortfolios() {
      if(this.$store.state.portfolio.portfolioListResponse && this.$store.state.portfolio.portfolioListResponse.totalElements) {
        return this.$store.state.portfolio.portfolioListResponse.totalElements;
      }
      return 0;
    },
    totalMessages() {
      if(this.$store.state.message.messageListResponse && this.$store.state.message.messageListResponse.length) {
        return this.$store.state.message.messageListResponse.length;
      }
      return 0;
    }
  }
};
</script>
