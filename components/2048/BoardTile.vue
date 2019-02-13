<template>
  <div :class="tileClasses" :style="tileStyle">{{ tile.val }}</div>
</template>

<script>
export default {
  name: 'BoardTile',

  props: {
    tile: {
      type: Object,
      default: () => ({ val: -1 })
    }
  },

  computed: {
    tileStyle() {
      return {
        zIndex: this.tile.deleted ? 1 : 100
      };
    },
    tileClasses() {
      // all tiles
      const classes = ['board__tile'];
      // position
      classes.push(`board__tile--${this.tile.x}-${this.tile.y}`);
      // value colors
      classes.push(
        this.tile.val < 128
          ? `board__tile--${this.tile.val}`
          : 'board__tile--max'
      );
      return classes.join(' ');
    }
  }
};
</script>

<style lang="scss">
// .popin {
//   animation: tile-pop-in 0.2s ease;
// }
// @keyframes tile-pop-in {
//   0% {
//     transform: scale(0);
//   }
//   50% {
//     transform: scale(1.2);
//   }
//   100% {
//     transform: scale(1);
//   }
// }
</style>
