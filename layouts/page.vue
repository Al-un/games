<template>
  <div id="main-container">
    <header id="main-header">
      <div class="container">
        <nuxt-link to="/" class="temp-home">Home</nuxt-link>
      </div>
    </header>
    <main>
      <div class="container">
        <nuxt/>
      </div>
    </main>
    <footer id="main-footer">
      <div class="container">
        <a href="https://github.com/al-un/games">
          <img src="@/assets/img/GitHub_Logo_White.png" title="View on Github" alt="View on Github">
        </a>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  layout: 'default'
};
</script>


<style lang='scss' scoped>
#main-footer {
  img {
    height: 40px;
  }
}
</style>
