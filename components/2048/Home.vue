<template>
  <div class="game-select">
    <div class="format-pictures">
      <img
        v-for="format in formats"
        :key="format.size"
        :alt="format.text"
        :title="format.text"
        :src="format.img"
        :class="{ show: format.size === size }"
      >
    </div>

    <div class="format-selector">
      <button @click="decreaseSize">Left</button>
      <span
        v-for="f in formats"
        :key="f.size"
        class="format"
        :class="{ show: f.size === size }"
      >{{ f.text }}</span>
      <button @click="increaseSize">Right</button>
    </div>

    <button class="newgame-btn" @click="newGame">Start game</button>

    <div style="text-align: left;">
      <ul>
        <li>Use left/right arrow to select a board size</li>
        <li>Press "n" to start a new game</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'GameSelect',

  data() {
    return {
      formats: [
        { size: 3, img: '/2048/img3x3.png', text: 'Tiny (3 x 3)' },
        { size: 4, img: '/2048/img4x4.png', text: 'Classic (4 x 4)' },
        { size: 5, img: '/2048/img5x5.png', text: 'Big (5 x 5)' },
        { size: 6, img: '/2048/img6x6.png', text: 'Bigger (6 x 6)' },
        { size: 8, img: '/2048/img8x8.png', text: 'Huge (8 x 8)' }
      ]
    };
  },

  computed: {
    ...mapState({
      size: state => state['2048'].size
    })
  },

  methods: {
    ...mapActions('2048', ['newGame', 'increaseSize', 'decreaseSize'])
  }
};
</script>

<style lang="scss" scoped>
.game-select {
  width: $board2048-px-sm;
  margin: auto;
  padding: 0px 1rem;

  @include gt-sm {
    width: $board2048-px-lg;
    padding: 0;
  }
  margin: auto;
  text-align: center;
}

.format-selector {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  margin: 2rem 0px;

  .format {
    display: none;
    margin: 0px 1rem;
    &.show {
      display: block;
    }
  }
}

.format-pictures {
  img {
    display: none;
    width: 100%;
    margin: auto;
    &.show {
      display: block;
    }
  }
}

.newgame-btn {
  background-color: #f58460;
  color: #f9f8f4;
  border-radius: 8px;
  width: 100%;
  max-width: 300px;
  height: 60px;
  font-size: 30px;
  line-height: 60px;
  border: none;
  transition: background-color 0.2s;

  &:hover {
    cursor: pointer;
    background-color: #dd7454;
  }
}
</style>
