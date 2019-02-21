import { GAME_STATUS } from '@/games/2048/constants';
import { Game2048Mutations } from './types';
import { getTileIndex } from '@/games/2048/board';
import Game from '@/games/2048/game';
import Seed, { generateSeed } from '@/games/2048/play/seed';
import Movement from '@/games/2048/play/movement';
import LastTurn from '@/games/2048/game/last-turn';

const mutations: Game2048Mutations = {
  initialiseGame(state, seeds) {
    state.game = new Game(state.size, seeds);
    state.status = GAME_STATUS.PLAYING;
  },

  updateTiles(state, turn) {
    state.game.lastTurn = new LastTurn(state.game.tiles, state.game.score);

    // update board
    state.game.tiles = turn.tiles;
    state.game.score += turn.scoreChange;

    // add move
    const movement = new Movement(
      turn.direction.name,
      state.game.moves.length + 1
    );
    state.game.moves.unshift(movement);

    state.status = GAME_STATUS.PLAYING;
  },

  seed(state, turn) {
    const seed = generateSeed(turn.emptyCells, state.game.tileSeqId);
    // https://stackoverflow.com/a/41855691/4906586
    state.game.tiles.splice(getTileIndex(state.game.size, seed), 1, seed);

    state.game.tileSeqId++;
    state.game.moves[0].seed = new Seed(seed.x, seed.y, seed.val);
  },

  cancelMove(state) {
    if (state.game.lastTurn !== undefined) {
      state.game.tiles = state.game.lastTurn.tiles;
      state.game.score = state.game.lastTurn.score;
      state.game.moves.shift();
      state.game.lastTurn.valid = false;
    } else {
      console.error('Last move not defined. Cannot cancel move');
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
