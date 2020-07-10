<script>
export default {
  name: "Redirect",
  watch: {
    $route: {
      // eslint-disable-next-line no-unused-vars
      handler(route) {
        const { params, query } = this.$route;
        const { path } = params;
        this.$router.replace({ path: "/" + path, query });
      },
      immediate: true,
    },
  },
  render(h) {
    return h();
  },
};
</script>
