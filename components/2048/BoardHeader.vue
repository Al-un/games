<template>
  <div class="page2048__row board__header">
    <div class="board__header__title">2048</div>
    <div class="page2048__box board__header__score">
      <p>SCORE</p>
      <p>{{ score }}</p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'BoardHeader',

  computed: {
    ...mapState({
      score: state => state['2048'].score
    })
  }
};
</script>

<style lang="scss">
.board__header {
  align-items: center;
  justify-content: space-between;

  .board__header__title {
    font-size: 60px;
  }

  .board__header__score {
    p {
      margin: 4px 0px;
      &:first-child {
        font-size: 18px;
      }
      &:last-child {
        font-size: 24px;
      }
    }
  }
}
</style>
