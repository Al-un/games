import { GAME_STATUS } from './utils/constant';
import { printTiles, isGameOver, clearDeleted } from './utils';

export default {
  /**
   * Initialise a new 2048 game
   * @param {*} state Former state
   * @param {Object} payload
   * @param {Tile} payload.seed1 first tile
   * @param {Tile} payload.seed2 second tile
   */
  initialiseGame(state, { seed1, seed2 }) {
    console.log('[2048] ------------------ Game start! ------------------');
    state.tileId = 2; // always 2 as two seeds are provided
    state.moves = []; // no moves
    state.tiles = [seed1, seed2];
    state.status = GAME_STATUS.PLAYING;
    printTiles(state.size, state.tiles);
  },

  /**
   * Update store tiles
   *
   * @param {*} state
   * @param {Object} payload
   * @param {Array} payload.tiles freshly updated tiles
   * @param {String} payload.direction this turn movement
   * @param {Number} payload.score this turn score
   */
  updateTiles(state, { tiles, direction, score }) {
    // save last turn
    state.lastTurn = {
      tiles: state.tiles,
      score: state.score
    };

    // update tiles
    tiles.forEach(tile => {
      const match = state.tiles.filter(t => t.id === tile.id);
      if (match.length === 0) {
        state.tiles.push(tile);
      } else {
        match[0].x = tile.x;
        match[0].y = tile.y;
        match[0].merged = tile.merged;
        match[0].deleted = tile.deleted;
        match[0].val = tile.val;
      }
    });
    // state.tiles = tiles;

    // add movement
    const newMove = {
      id: state.moves.length + 1,
      timestamp: Date.now(),
      direction: direction
    };
    state.moves.unshift(newMove);

    // update score
    state.score += score;
  },

  clearDeleted(state) {
    state.tiles = clearDeleted(state.tiles);
  },

  /**
   *
   * @param {*} state
   * @param {*} param1
   */
  seed(state, seed) {
    // generate seed
    // state.tiles = clearDeleted(state.tiles);
    state.tiles.push(seed);
    state.tileId++;

    // Game over check
    if (isGameOver(state.size, state.tiles)) {
      state.status = GAME_STATUS.GAMEOVER;
      console.log('[2048] ------------------ GAME OVER ! ------------------');
    } else {
      // keep playing!
      state.status = GAME_STATUS.PLAYING;
      printTiles(state.size, state.tiles);
    }
  },

  cancelMove(state) {
    if (state.lastTurn) {
      state.tiles = state.lastTurn.tiles;
      state.score = state.lastTurn.score;
      state.moves.shift();
      state.lastTurn = undefined;
    }
  },

  updateBoardSize(state, size) {
    state.size = size;
  },

  changeGameStatus(state, gameStatus) {
    state.status = gameStatus;
    // console.log(`New game status: ${state.status}`);
  }
};
