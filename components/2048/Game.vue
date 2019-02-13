<template>
  <div class="board">
    <board-header/>
    <board/>
    <game-over v-if="status === 'gameover'"/>

    <div style="text-align: left;">
      <ul>
        <li>Use arrows to move tiles</li>
        <li>Press "c" to cancel last move. One cancel only is possible</li>
        <li>Press "x" to come back to main menu</li>
      </ul>
    </div>

    <div style="display: none; height: 200px; overflow-y: scroll;">
      <div
        v-for="move in moves"
        :key="move.id"
        style="display: flex; flex-direction: row nowrap; height: 30px;border-bottom: 1px solid teal; align-items: center;"
      >
        <div style="width: 100px; text-align: center;">{{ move.id }}</div>
        <div style="width: 250px; text-align: center;">{{ move.timestamp | time }}</div>
        <div style="flex: 1;">{{ move.direction }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Board from './Board';
import BoardHeader from './BoardHeader';
import GameOver from './GameOver';

export default {
  name: 'Game',
  components: {
    Board,
    BoardHeader,
    GameOver
  },

  filters: {
    time(value) {
      const date = new Date(value);
      return (
        date.toLocaleTimeString('en-GB', { hour12: false }) +
        '.' +
        date.getMilliseconds()
      );
    }
  },

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
.board {
  width: $board2048-sm;
  margin: auto;
  padding: 0px 1rem;

  @include gt-sm {
    width: $board2048-lg;
    padding: 0;
  }
}
</style>
