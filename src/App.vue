<template>
  <component :is="layout">
    <router-view/>
  </component>
</template>

<script lang="ts">
import Vue from 'vue';

const DEFAULT_LAYOUT = 'default';

export default Vue.extend({
  computed: {
    layout(): string {
      return (this.$route.meta.layout || DEFAULT_LAYOUT) + '-layout';
    }
  }
});
</script>


<style lang="scss">
</style>
