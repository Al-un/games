<template>
  <div>
    <button :disabled="!isCancelable" @click="cancelMove">Cancel</button>
    <button @click="exitGame">Exit</button>
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
