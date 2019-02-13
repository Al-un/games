<template>
  <div id="page2048" class="game-container game2048">
    <home v-if="status ==='select'"/>
    <game v-else/>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import Game from '@/components/2048/Game';
import Home from '@/components/2048/Home';

/**
    v-hammer:swipe.left="moveLeft"
    v-hammer:swipe.up="moveUp"
    v-hammer:swipe.down="moveDown"
    v-hammer:swipe.right="moveRight"
 * Swipe:
 * https://css-tricks.com/simple-swipe-with-vanilla-javascript/
 * https://codepen.io/thebabydino/pen/yvrmMN/?editors=0010
 */
export default {
  components: {
    Game,
    Home
  },

  data() {
    return {
      swiping: false,
      swipeStart: undefined,
      swipeEnd: undefined
    };
  },

  computed: {
    ...mapState({
      status: state => state['2048'].status
    })
  },
  mounted() {
    addEventListener('keydown', this.onkeydown);

    const Hammer =
      typeof require === 'function' ? require('hammerjs') : window.Hammer;
    const page = document.querySelector('#page2048');
    const hammerManager = new Hammer.Manager(page);
    const swipe = new Hammer.Swipe();
    hammerManager.add(swipe);

    hammerManager.on('swipeleft', e => {
      this.moveLeft();
    });
    hammerManager.on('swiperight', e => {
      this.moveRight();
    });
    hammerManager.on('swipeup', e => {
      this.moveUp();
    });
    hammerManager.on('swipedown', e => {
      this.moveDown();
    });
  },

  beforeDestroy() {
    removeEventListener('keydown', this.onkeydown);
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
    ]),

    onkeydown(e) {
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
};
</script>


<style lang="scss">
.game2048 {
  background-color: #faf8ef;
  font-family: 'Clear Sans', 'Helvetica Neue', Arial, sans-serif;
}
</style>
