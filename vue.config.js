module.exports = {
  css: {
    loaderOptions: {
      sass: {
        data: `
          @import "@/assets/scss/common/_variables.scss";
          @import "@/assets/scss/common/_mixins.scss";
        `
      }
    }
  }
};
