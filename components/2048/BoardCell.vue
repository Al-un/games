<template>
  <div :class="cellClasses"/>
</template>

<script>
export default {
  name: 'BoardCell',

  props: {
    coord: {
      type: Object,
      default: () => ({ x: 0, y: 0 })
    }
  },

  computed: {
    cellClasses() {
      return `board__cell board__cell--${this.coord.x}-${this.coord.y}`;
    }
  }
};
</script>
