<template>
  <div class="game-select">
    <div class="page2048__row format-pictures">
      <img
        v-for="format in formats"
        :key="format.size"
        :alt="format.text"
        :title="format.text"
        :src="format.img"
        :class="{ show: format.size === size }"
      >
    </div>

    <div class="page2048__row format-selector">
      <button @click="decreaseSize">
        <fa-icon icon="chevron-left"/>
      </button>
      <span
        v-for="f in formats"
        :key="f.size"
        class="format"
        :class="{ show: f.size === size }"
      >{{ f.text }}</span>
      <button @click="increaseSize">
        <fa-icon icon="chevron-right"/>
      </button>
    </div>

    <button class="newgame-btn" @click="newGame">Start game</button>

    <div style="text-align: left;" class="mobile--hide">
      <ul>
        <li>Use left/right arrow to select a board size</li>
        <li>Press "n" to start a new game</li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { mapState, mapActions } from 'vuex';

@Component({
  name: 'GameSelect',

  data() {
    return {
      formats: [
        { size: 3, img: '/2048/img/img3x3.png', text: 'Tiny (3 x 3)' },
        { size: 4, img: '/2048/img/img4x4.png', text: 'Classic (4 x 4)' },
        { size: 5, img: '/2048/img/img5x5.png', text: 'Big (5 x 5)' },
        { size: 6, img: '/2048/img/img6x6.png', text: 'Bigger (6 x 6)' },
        { size: 8, img: '/2048/img/img8x8.png', text: 'Huge (8 x 8)' }
      ]
    };
  },

  computed: {
    ...mapState('2048', ['size'])
  },

  methods: {
    ...mapActions('2048', ['newGame', 'increaseSize', 'decreaseSize'])
  }
})
export default class GameSelect extends Vue {}
</script>

<style lang="scss" scoped>
.game-select {
  width: $game2048-board-sm-px;
  margin: auto;
  padding: 0px 1rem;

  @include gt-sm {
    width: $game2048-board-lg-px;
    padding: 0;
  }
  margin: auto;
  text-align: center;
}

.format-selector {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  margin: 2rem 0px;

  .format {
    display: none;
    margin: 0px 1rem;
    color: darken(#8f7b66, 10%);
    font-size: 28px;

    &.show {
      display: block;
    }
  }

  button {
    background: none;
    border: none;
    color: #8f7b66;
    font-size: 48px;
    transition: color 0.2s;
    &:hover {
      cursor: pointer;
      color: darken(#8f7b66, 10%);
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
  color: $game2048-fg-default;
  border-radius: $game2048-board-border-radius;
  width: 100%;
  max-width: 300px;
  height: 60px;
  font-size: 30px;
  line-height: 60px;
  border: none;
  transition: background-color $game2048-transition-effect ease;

  &:hover {
    cursor: pointer;
    background-color: darken(#f58460, 10%);
  }
}
</style>
