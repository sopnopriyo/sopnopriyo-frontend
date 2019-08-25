<template>
  <div class="about">
    <h1>This is an about page</h1>
    <h1></h1>
    <p>{{authUser}}</p>
  </div>
</template>
<style lang="scss">
</style>
<script>
export default {
  layout: "admin-panel",
  middleware: "authenticated",
  created() {},
  computed: {
    authUser() {
      return this.$store.state.auth.auth;
    }
  }
};
</script>
