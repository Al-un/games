<template>
  <div class="board__header">
    <div class="board__header__title">2048</div>
    <div class="board__header__score">
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
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
  margin: 2rem 0px;

  .board__header__title {
    font-size: 60px;
  }

  .board__header__score {
    background-color: #bbada0;
    color: #f9f6f2;
    border-radius: 4px;
    padding: 4px 1rem;
    text-align: center;
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
