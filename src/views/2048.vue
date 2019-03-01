<template>
  <div id="page2048" class="game-container">
    <home v-if="status ==='select'"/>
    <game v-else/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { mapState, mapActions } from 'vuex';
import Game from '@/components/2048/Game.vue';
import Home from '@/components/2048/Home.vue';

import '@/assets/2048/scss/main.scss';

var hammer = require('hammerjs');
declare var hammer: any;

/**
 * Swipe:
 * https://css-tricks.com/simple-swipe-with-vanilla-javascript/
 * https://codepen.io/thebabydino/pen/yvrmMN/?editors=0010
 */
@Component({
  components: {
    Game,
    Home
  },

  computed: {
    ...mapState('2048', ['status'])
  },

  methods: {
    ...mapActions('2048', [
      'moveLeft',
      'moveRight',
      'moveUp',
      'moveDown',
      'newGame',
      'exitGame',
      'cancelMove'
    ])
  }
})
export default class Game2048 extends Vue {
  private moveLeft!: () => void;
  private moveRight!: () => void;
  private moveUp!: () => void;
  private moveDown!: () => void;
  private exitGame!: () => void;
  private newGame!: () => void;
  private cancelMove!: () => void;

  public mounted() {
    window.addEventListener('keydown', this.onkeydown);

    // const Hammer =
    //   typeof require === 'function' ? require('hammerjs') : window.Hammer;
    const Hammer = hammer;
    const page = document.querySelector('#page2048');
    const hammerManager = new Hammer.Manager(this.$el);
    const swipe = new Hammer.Swipe();
    hammerManager.add(swipe);

    hammerManager.on('swipeleft', (e: any) => this.moveLeft());
    hammerManager.on('swiperight', (e: any) => this.moveRight());
    hammerManager.on('swipeup', (e: any) => this.moveUp());
    hammerManager.on('swipedown', (e: any) => this.moveDown());
  }

  public beforeDestroy() {
    window.removeEventListener('keydown', this.onkeydown);
  }

  public onkeydown(e: any): void {
    const key = e.key;
    if (key === 'ArrowLeft') {
      this.moveLeft();
    } else if (key === 'ArrowRight') {
      this.moveRight();
    } else if (key === 'ArrowUp') {
      this.moveUp();
    } else if (key === 'ArrowDown') {
      this.moveDown();
    } else if (key === 'x') {
      this.exitGame();
    } else if (key === 'n') {
      this.newGame();
    } else if (key === 'c') {
      this.cancelMove();
    }
  }
}
</script>
