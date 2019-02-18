<template>
  <div id="main-container">
    <header id="main-header">
      <div class="container">
        <router-link to="/" class="temp-home">Home</router-link>
      </div>
    </header>
    <main>
      <div class="container">
        <slot></slot>
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

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class LayoutPage extends Vue {}
</script>

<style lang='scss' scoped>
#main-footer {
  img {
    height: 40px;
  }
}
</style>
