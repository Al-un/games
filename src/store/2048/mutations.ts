import { GAME_STATUS } from '@/games/2048/constants';
import { Game2048Mutations } from './types';
import Game, { isGameOver } from '@/games/2048/game';
import _ from 'lodash';

const mutations: Game2048Mutations = {
  initialiseGame(state, seeds) {
    state.game = new Game(state.size, seeds);
    state.status = GAME_STATUS.PLAYING;
  },

  updateGame(state, turn) {
    // update game
    state.game.lastTurn = turn.lastTurn;
    state.game.tiles = turn.tiles;
    state.game.score += turn.scoreChange;
    state.game.tileSeqId += turn.tileSeqChange;
    state.game.moves.unshift(turn.movement);

    // update status
    state.status = isGameOver(state.game)
      ? GAME_STATUS.GAMEOVER
      : GAME_STATUS.PLAYING;
  },

  cancelMove(state) {
    if (state.game.lastTurn.valid) {
      state.game.tiles = state.game.lastTurn.tiles;
      state.game.score = state.game.lastTurn.score;
      state.game.moves.shift();
      state.game.lastTurn.valid = false;
      // in case it was game over
      state.status = GAME_STATUS.PLAYING;
    } else {
      console.error('Last move not valid. Cannot cancel move');
    }
  },

  updateBoardSize(state, size) {
    state.size = size;
  },

  changeGameStatus(state, gameStatus) {
    state.status = gameStatus;
  }
};

export default mutations;
