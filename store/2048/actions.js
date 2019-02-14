import {
  GAME_STATUS,
  MOVE_LEFT,
  MOVE_UP,
  MOVE_RIGHT,
  MOVE_DOWN,
  ALL_SIZES,
  MOVE_TIME
} from './utils/constant';
import { Grid, Tile } from './utils/model';
import { generateSeed } from './utils';
import { isCancelable } from './getters';

export default {
  decreaseSize({ commit, state }) {
    const idx = ALL_SIZES.findIndex(val => val === state.size);
    const newSize =
      idx > 0 ? ALL_SIZES[idx - 1] : ALL_SIZES[ALL_SIZES.length - 1];
    commit('updateBoardSize', newSize);
  },

  increaseSize({ commit, state }) {
    const idx = ALL_SIZES.findIndex(val => val === state.size);
    const newSize =
      idx < ALL_SIZES.length - 1 ? ALL_SIZES[idx + 1] : ALL_SIZES[0];
    commit('updateBoardSize', newSize);
  },

  /**
   * Initialise a new game
   * @param {*} context
   * @param {Number} size board size
   */
  newGame({ commit, state }) {
    if (state.status === GAME_STATUS.SELECT) {
      // Generate two pairs of random coordinates
      const randX1 = Math.floor(Math.random() * (state.size - 1));
      const randY1 = Math.floor(Math.random() * (state.size - 1));
      let randX2 = randX1;
      let randY2 = randY1;
      while (randX1 === randX2 && randY1 === randY2) {
        randX2 = Math.floor(Math.random() * (state.size - 1));
        randY2 = Math.floor(Math.random() * (state.size - 1));
      }

      // Generate two seeds
      const seed1 = new Tile(randX1, randY1, 0);
      const seed2 = new Tile(randX2, randY2, 1);

      // Off we go
      commit('initialiseGame', { seed1, seed2 });
    }
  },

  /**
   * Moving left
   * @param {*} param0
   */
  moveLeft({ dispatch, state }) {
    switch (state.status) {
      case GAME_STATUS.SELECT:
        dispatch('decreaseSize');
        break;
      case GAME_STATUS.PLAYING:
        dispatch('move', 'left');
        break;
    }
  },

  /**
   * Moving right
   * @param {*} param0
   */
  moveRight({ dispatch, state }) {
    switch (state.status) {
      case GAME_STATUS.SELECT:
        dispatch('increaseSize');
        break;
      case GAME_STATUS.PLAYING:
        dispatch('move', 'right');
        break;
    }
  },

  /**
   * Moving up
   * @param {*} param0
   */
  moveUp({ dispatch, state }) {
    switch (state.status) {
      case GAME_STATUS.SELECT:
        // do nothing
        break;
      case GAME_STATUS.PLAYING:
        dispatch('move', 'up');
        break;
    }
  },

  /**
   * Moving down
   * @param {*} param0
   */
  moveDown({ dispatch, state }) {
    switch (state.status) {
      case GAME_STATUS.SELECT:
        // do nothing
        break;
      case GAME_STATUS.PLAYING:
        dispatch('move', 'down');
        break;
    }
  },

  /**
   *
   * @param {*} param0
   * @param {String} direction moving direction
   */
  move({ commit, state }, direction) {
    // invalid timing to initiate a move
    if (state.status !== GAME_STATUS.PLAYING) {
      return;
    }

    commit('changeGameStatus', GAME_STATUS.MOVING);

    let grid;
    // https://stackoverflow.com/a/44837981/4906586
    const stateTiles = state.tiles.map((b, idx) =>
      Object.assign({ index: idx }, b)
    );

    switch (direction) {
      case 'left':
        console.log('[2048] >> MOVING LEFT');
        grid = new Grid(state.size, stateTiles, MOVE_LEFT);
        break;
      case 'up':
        console.log('[2048] >> MOVING UP');
        grid = new Grid(state.size, stateTiles, MOVE_UP);
        break;
      case 'right':
        console.log('[2048] >> MOVING RIGHT');
        grid = new Grid(state.size, stateTiles, MOVE_RIGHT);
        break;
      case 'down':
        console.log('[2048] >> MOVING DOWN');
        grid = new Grid(state.size, stateTiles, MOVE_DOWN);
        break;
    }
    // seed only if at least a tile has moved
    if (grid && grid.movedTilesCount > 0) {
      const tiles = grid.tiles;
      const score = grid.score;
      commit('clearDeleted');
      commit('updateTiles', { tiles, direction, score });

      // setTimeout(() => {
      const seed = generateSeed(grid.emptyCoordinates, state.tileId);
      commit('seed', seed);
      // }, MOVE_TIME);
    } else {
      commit('changeGameStatus', GAME_STATUS.PLAYING);
    }
  },

  cancelMove({ commit, state }) {
    if (isCancelable(state)) {
      commit('cancelMove');
    }
  },

  exitGame({ commit }) {
    commit('changeGameStatus', GAME_STATUS.SELECT);
  }
};
