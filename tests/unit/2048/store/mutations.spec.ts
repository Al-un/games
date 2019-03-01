import mutations from '@/store/2048/mutations';
import { Game2048State } from '@/store/2048/types';
import { GAME_STATUS, MOVE_LEFT } from '@/games/2048/constants';
import { mock1, mock3 } from '../games/game/game.mock';
import Tile, { cloneTile } from '@/games/2048/board/tile';
import LastTurn from '@/games/2048/game/last-turn';
import Movement from '@/games/2048/play/movement';
import Turn from '@/games/2048/play/turn';
import { getTileIndex } from '@/games/2048/board';
import { getConsoleErrSpy } from '../../utils';
import { mock2048Module } from './store.mock';

let state: Game2048State;

describe('2048 mutations', () => {
  beforeEach(() => {
    state = mock2048Module().state;
  });

  describe('initialiseGame', () => {
    let seed1: Tile;
    let seed2: Tile;
    const size = 5;

    beforeEach(() => {
      state.size = 5;
      seed1 = new Tile(2, 0, 0);
      seed2 = new Tile(3, 2, 1);
      mutations.initialiseGame(state, [seed1, seed2]);
    });

    test('initialises a 5x5 new game', () => {
      // Mock1 game was a 4x4 board
      expect(state.game.size).toBe(size);
      // Seeds are copied
      expect(state.game.seeds).toEqual([seed1, seed2]);
      expect(state.game.tileSeqId).toBe(3);
      // Tiles are properly located
      expect(state.game.tiles.length).toBe(25); // 5*5
      expect(getTileIndex(size, seed1)).toBe(2);
      expect(getTileIndex(size, seed2)).toBe(13);
      expect(state.game.tiles[getTileIndex(size, seed1)]).toBeDefined();
      expect(state.game.tiles[getTileIndex(size, seed2)]).toBeDefined();
      // Other reset
      expect(state.game.moves.length).toBe(0);
      expect(state.game.score).toBe(0);
    });

    test('changes status to "playing"', () => {
      expect(state.status).toEqual(GAME_STATUS.PLAYING);
    });
  });

  describe('updateTiles with a moving LEFT', () => {
    let turn: Turn;
    let prevTiles: Tile[];
    let prevScore: number;
    let prevMoves: Movement[];

    beforeEach(() => {
      // when moving left a tile is merged
      state.game = mock3();
      // to ensure deep clone
      prevTiles = state.game.tiles.map(tile => cloneTile(tile));
      prevScore = state.game.score;
      prevMoves = state.game.moves.slice(0);

      // create turn
      turn = new Turn(state.game, MOVE_LEFT);
      // moves tiles
      mutations.updateTiles(state, turn);
    });

    test('saves lastTurn', () => {
      const lastTurn = state.game.lastTurn;
      expect(lastTurn).toBeDefined();

      if (lastTurn !== undefined) {
        expect(lastTurn.tiles).toEqual(prevTiles);
        expect(lastTurn.score).toEqual(prevScore);
      }
    });

    test('copies Turn tiles into game tiles', () => {
      expect(state.game.tiles).not.toEqual(prevTiles);
      expect(state.game.tiles).toEqual(turn.tiles);
    });

    test('increase score', () => {
      expect(state.game.score).toBe(prevScore + turn.scoreChange);
    });

    test('prepends the left movement', () => {
      const move = state.game.moves[0];
      expect(state.game.moves).toEqual([move, ...prevMoves]);
    });

    test('changes stats to GAME_STATUS.PLAYING', () => {
      expect(state.status).toEqual(GAME_STATUS.PLAYING);
    });
  });

  describe('seed', () => {
    let turn: Turn;

    beforeEach(() => {
      // when moving left a tile is merged
      state.game = mock3();

      // moves tiles
      turn = new Turn(state.game, MOVE_LEFT);
      mutations.updateTiles(state, turn);
    });

    test('appends a seed to the first movement', () => {
      expect(state.game.moves[0].seed).toBeUndefined();
      mutations.seed(state, turn);
      expect(state.game.moves[0].seed).toBeDefined();
    });

    test('increments game tileSeqId', () => {
      const tileSeq = state.game.tileSeqId;
      mutations.seed(state, turn);
      expect(state.game.tileSeqId).toBe(tileSeq + 1);
    });

    test('has one more one non-undefined tile', () => {
      const prevTilesCount = state.game.tiles
        .map((tile: Tile): number => (tile !== undefined ? 1 : 0))
        .reduce((count, val) => count + val);

      mutations.seed(state, turn);

      const tilesCount = state.game.tiles
        .map((tile: Tile): number => (tile !== undefined ? 1 : 0))
        .reduce((count, val) => count + val);
      expect(tilesCount).toBe(prevTilesCount + 1);
    });
  });

  describe('cancelMove', () => {
    describe('when game.lastTurn.valid is true', () => {
      const lastTurnTiles: Tile[] = [];
      const lastTurnScore = 666;
      let gameMoves: Movement[];

      beforeEach(() => {
        // Define last turn
        lastTurnTiles[0] = new Tile(0, 0, 0);
        lastTurnTiles[2] = new Tile(2, 0, 1);
        const lastTurn = new LastTurn(lastTurnTiles, lastTurnScore);
        state.game.lastTurn = lastTurn;

        // save previous game info
        gameMoves = state.game.moves.map(m => {
          const cloneMove = new Movement(m.direction, m.id);
          cloneMove.timestamp = m.timestamp;
          cloneMove.seed = m.seed;
          return cloneMove;
        });

        mutations.cancelMove(state);
      });

      test('replaces game tiles with lastTurn tiles', () => {
        expect(state.game.tiles).toEqual(lastTurnTiles);
      });

      test('replaces game score with lastTurn score', () => {
        expect(state.game.score).toBe(lastTurnScore);
      });

      test('removes the first move', () => {
        expect(state.game.moves).toEqual(gameMoves.slice(1));
      });

      test('makes game last turn invalid', () => {
        expect(state.game.lastTurn.valid).toBeFalsy();
      });
    });

    describe('when game.lastTurn.valid is false', () => {
      let consoleErrSpy: jest.SpyInstance;

      beforeEach(() => {
        consoleErrSpy = getConsoleErrSpy();
        state.game.lastTurn.valid = false;
        mutations.cancelMove(state);
      });

      test('prints a console.error', () => {
        expect(consoleErrSpy).toHaveBeenCalled();
      });
    });
  });

  describe('updateBoardSize', () => {
    test('properly updates size', () => {
      mutations.updateBoardSize(state, 8);
      expect(state.size).toBe(8);
    });
  });

  describe('changeGameStatus', () => {
    test('properly updates status', () => {
      mutations.changeGameStatus(state, GAME_STATUS.MOVING);
      expect(state.status).toBe(GAME_STATUS.MOVING);
    });
  });
});
