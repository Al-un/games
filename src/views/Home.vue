<template>
  <game-list></game-list>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import GameList from '@/components/Home/GameList.vue';

@Component({
  components: {
    GameList
  }
})
export default class Home extends Vue {}
</script>
