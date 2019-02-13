<template>
  <div class="game-container game2048">
    <home v-if="status ==='select'"/>
    <game v-else/>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import Game from '@/components/2048/Game';
import Home from '@/components/2048/Home';

/**
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
    addEventListener('mousedown', this.startSwipe, false);
    addEventListener('touchstart', this.startSwipe, false);
    addEventListener('mousemove', this.moveSwipe, false);
    addEventListener('touchmove', this.moveSwipe, false);
    addEventListener('mouseup', this.endSwipe, false);
    addEventListener('touchend', this.endSwipe, false);
  },

  beforeDestroy() {
    removeEventListener('keydown', this.onkeydown);
    removeEventListener('mousedown', this.startSwipe);
    removeEventListener('touchstart', this.startSwipe);
    removeEventListener('mousemove', this.moveSwipe);
    removeEventListener('touchmove', this.moveSwipe);
    removeEventListener('mouseup', this.endSwipe);
    removeEventListener('touchend', this.endSwipe);
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
    },

    startSwipe(e) {
      this.swiping = true;
    },
    moveSwipe(e) {
      e.preventDefault();
    },
    endSwipe(e) {
      this.swiping = false;
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
