<template>
  <div id="main-container">
    <header id="main-header">
      <div class="container">
        <router-link to="/" class="temp-home">Home</router-link>
      </div>
    </header>
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class LayoutDefault extends Vue {}
</script>
