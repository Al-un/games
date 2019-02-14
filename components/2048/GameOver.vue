<template>
  <div class="game2048__gameover">
    <h4>GameOver</h4>
    <p>Final score: {{ score }} in {{ moves.length }} moves</p>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'GameOver',

  computed: {
    ...mapState({
      status: state => state['2048'].status,
      moves: state => state['2048'].moves,
      score: state => state['2048'].score
    })
  }
};
</script>

<style lang="scss">
.game2048__gameover {
  background: lightpink;
  border: 1px solid darkred;
  border-radius: $game2048-border-radius;
  text-align: center;
  padding: 0.5rem;
  margin: 0.5rem 0px;
}
</style>
