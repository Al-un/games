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
      const classes = ['board2048__tile'];
      // position
      classes.push(`board2048__tile--${this.tile.x}-${this.tile.y}`);
      // value colors
      classes.push(
        this.tile.val < 128
          ? `board2048__tile--${this.tile.val}`
          : this.tile.val < 8192
            ? 'board2048__tile--128'
            : 'board2048__tile--max'
      );
      // smaller font-size:
      if (this.tile.val >= 1024) {
        classes.push('board2048__tile--1024');
      }
      return classes.join(' ');
    }
  }
};
</script>
