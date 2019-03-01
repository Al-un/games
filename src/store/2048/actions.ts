import { Game2048Actions } from './types';
import { BOARD_SIZES, GAME_STATUS, MOVE_TIME } from '@/games/2048/constants';
import Tile from '@/games/2048/board/tile';
import Turn from '@/games/2048/play/turn';
import { getDirection } from '@/games/2048/board/direction';
import { printTiles } from '@/games/2048/board';
import { doIfDebug } from '../utils';
import { isGameOver } from '@/games/2048/game';

const actions: Game2048Actions = {
  decreaseSize({ commit, state, rootState }) {
    const idx = BOARD_SIZES.findIndex(val => val === state.size);
    const newSize =
      idx > 0 ? BOARD_SIZES[idx - 1] : BOARD_SIZES[BOARD_SIZES.length - 1];
    commit('updateBoardSize', newSize);

    doIfDebug(rootState, () => {
      console.log(`[2048] decreasing size to ${state.size}`);
    });
  },

  increaseSize({ commit, state, rootState }) {
    const idx = BOARD_SIZES.findIndex(val => val === state.size);
    const newSize =
      idx < BOARD_SIZES.length - 1 ? BOARD_SIZES[idx + 1] : BOARD_SIZES[0];
    commit('updateBoardSize', newSize);

    doIfDebug(rootState, () => {
      console.log(`[2048] incresing size to ${state.size}`);
    });
  },

  newGame({ commit, state, rootState }) {
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
      commit('initialiseGame', [seed1, seed2]);

      // debug
      doIfDebug(rootState, () => {
        console.log('[2048] >> Game start!!');
        console.log('[2048] initialise with seeds:', state.game.seeds);
        console.log(printTiles(state.game.size, state.game.tiles));
      });
    }
  },

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

  move({ commit, state, rootState }, directionName) {
    // invalid timing to initiate a move
    if (state.status !== GAME_STATUS.PLAYING) {
      return;
    }

    doIfDebug(rootState, () => {
      console.log(`[2048] >> MOVING ${directionName}`);
    });

    commit('changeGameStatus', GAME_STATUS.MOVING);

    const direction = getDirection(directionName);
    const turn = new Turn(state.game, direction);

    // seed only if at least a tile has moved
    if (turn.movedCount > 0) {
      commit('updateTiles', turn);

      setTimeout(() => {
        commit('seed', turn);

        doIfDebug(rootState, () => {
          console.log(`[2048] updateTiles: Score=${state.game.score}`);
          console.log('[2048] seed', state.game.moves[0].seed);
          console.log(printTiles(state.game.size, state.game.tiles));
        });

        if (isGameOver(state.game)) {
          doIfDebug(rootState, () => console.log('[2048] >> Game over !!'));
          commit('changeGameStatus', GAME_STATUS.GAMEOVER);
        } else {
          commit('changeGameStatus', GAME_STATUS.PLAYING);
        }
      }, MOVE_TIME);
    } else {
      commit('changeGameStatus', GAME_STATUS.PLAYING);
    }
  },

  cancelMove({ commit, rootState }) {
    commit('cancelMove');

    doIfDebug(rootState, () => {
      console.log('[2048] >> Cancelling move');
    });
  },

  exitGame({ commit }) {
    commit('changeGameStatus', GAME_STATUS.SELECT);
  }
};

export default actions;
