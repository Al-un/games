<template>
  <div class="page2048__row game-control">
    <button class="page2048__button" :disabled="!isCancelable" @click="cancelMove">Cancel</button>
    <button class="page2048__button" @click="exitGame">Exit</button>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  name: 'GameControl',

  computed: {
    ...mapGetters('2048', ['isCancelable'])
  },

  methods: {
    ...mapActions('2048', ['cancelMove', 'exitGame'])
  }
};
</script>

<style lang="scss" scoped>
.game-control {
  justify-content: flex-end;
  button {
    margin: 0px 1rem;
    padding: 8px;
    &:last-child {
      margin-right: 0px;
    }
  }
}
</style>
