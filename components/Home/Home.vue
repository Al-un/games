<template>
  <div class="game-list">
    <div v-for="game in games" :key="game.id" class="game-list__box">
      <nuxt-link :to="game.link">
        <div class="game-list__card">
          <h4>{{ game.name }}</h4>
          <div class="game-list__card__body">
            <img :src="game.img" :alt="game.name">
          </div>
        </div>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import games from './games.json';

export default {
  name: 'Home',

  data() {
    return {
      games: games
    };
  }
};
</script>

<style lang="scss">
.game-list {
  display: flex;
  flex-flow: row wrap;
  .game-list__box {
    width: 25%;
    padding: 1rem;
    a {
      text-decoration: none;
      color: auto;
    }
  }
  .game-list__card {
    background: white;
    border-radius: 8px;
    // shadow from https://codepen.io/sdthornton/pen/wBZdXq
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    &:hover {
      box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25),
        0 10px 10px rgba(0, 0, 0, 0.22);
    }
    /* card header */
    h4 {
      text-align: center;
      margin: auto;
      padding: 8px 0px;
      font-size: 1.5rem;
      background: #81d4fa; // MD Blue200
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
    }
    /* card body */
    .game-list__card__body {
      padding: 1rem;
      img {
        width: 100%;
        margin: auto;
        display: block;
      }
    }
  }
}
</style>
