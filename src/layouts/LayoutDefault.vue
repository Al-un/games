<template>
  <div id="game-container">
    <header id="main-header">
      <div class="container">
        <router-link to="/" class="home">
          <fa-icon icon="home"/>
        </router-link>
      </div>
    </header>
    <main>
      <slot></slot>
    </main>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class LayoutDefault extends Vue {}
</script>
