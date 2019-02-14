<template>
  <div :class="boardClasses">
    <board-cell v-for="(coord, index) in coords" :key="index" :coord="coord"/>
    <transition-group name="tiles">
      <board-tile v-for="tile in tiles" :key="tile.id" :tile="tile"/>
    </transition-group>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import BoardTile from './BoardTile';
import BoardCell from './BoardCell';

export default {
  name: 'Board',
  components: {
    BoardTile,
    BoardCell
  },

  computed: {
    ...mapState({
      size: state => state['2048'].size,
      tiles: state => state['2048'].tiles
    }),
    boardClasses() {
      return `board2048 board2048--${this.size}`;
    },
    coords() {
      const coordinates = [];
      for (let i = 0; i < this.size; i++) {
        for (let j = 0; j < this.size; j++) {
          coordinates.push({ x: i, y: j });
        }
      }
      return coordinates;
    }
  }
};
</script>

<style lang="scss">
.tiles-enter-active {
  animation: tile-pop-in $game2048-transition-popin;
}

// .game2048-tile-leave-active {
//   animation: tile-fade-out 0.2s;
// }

@keyframes tile-pop-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}
// @keyframes tile-fade-out {
//   0% {
//     opacity: 1;
//   }
//   100% {
//     opacity: 0;
//   }
// }
</style>
