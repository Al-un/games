<template>
  <div :class="tileClasses">{{ tile.val }}</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Tile from '@/games/2048/board/tile';

@Component({
  name: 'BoardTile',

  props: {
    tile: {
      type: Object,
      default: () => new Tile(0, 0, -1)
    }
  }
})
export default class BoardTile extends Vue {
  private tile!: Tile;

  get tileClasses(): string {
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
</script>
