import mutations from '@/store/2048/mutations';
import { Game2048State } from '@/store/2048/types';
import { GAME_STATUS, MOVE_LEFT, MOVE_UP } from '@/games/2048/constants';
import { mock3, mock5, mock1 } from '../games/game/game.mock';
import Tile, { cloneTile } from '@/games/2048/board/tile';
import LastTurn from '@/games/2048/game/last-turn';
import Movement from '@/games/2048/play/movement';
import Turn from '@/games/2048/play/turn';
import { getTileIndex } from '@/games/2048/board';
import { getConsoleErrSpy } from '../../utils';
import { mock2048Module } from './store.mock';
import _ from 'lodash';
import Game, { isGameOver } from '@/games/2048/game';

let state: Game2048State;
const consoleErrSpy: jest.SpyInstance = getConsoleErrSpy();

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

  describe('updateTiles', () => {
    let turn: Turn;
    let prevTiles: Tile[];
    let prevScore: number;
    let prevTileId: number;
    let prevMoves: Movement[];

    describe('with mock3 moving left (one tile merge)', () => {
      beforeEach(() => {
        // when moving left a tile is merged
        state.game = mock3();
        // to ensure deep clone
        prevTiles = _.cloneDeep(state.game.tiles);
        prevScore = state.game.score;
        prevTileId = state.game.tileSeqId;
        prevMoves = _.cloneDeep(state.game.moves);

        // create turn
        turn = new Turn(state.game, MOVE_LEFT);
        // moves tiles
        mutations.updateGame(state, turn);
      });

      test('has lastTurn', () => {
        const lastTurn = state.game.lastTurn;
        expect(lastTurn).toBeDefined();
        expect(lastTurn.tiles).toEqual(prevTiles);
        expect(lastTurn.score).toEqual(prevScore);
        expect(lastTurn.valid).toBeTruthy();
      });

      test('copies Turn tiles into game tiles', () => {
        expect(state.game.tiles).not.toEqual(prevTiles);
        expect(state.game.tiles).toEqual(turn.tiles);
      });

      test('increases score', () => {
        expect(state.game.score).toBe(prevScore + turn.scoreChange);
      });

      test('increases tileSeqId', () => {
        expect(state.game.tileSeqId).toBe(prevTileId + turn.tileSeqChange);
      });

      test('prepends the left movement', () => {
        const move = state.game.moves[0];
        expect(state.game.moves).toEqual([move, ...prevMoves]);
      });

      test('changes status to GAME_STATUS.PLAYING', () => {
        expect(state.status).toEqual(GAME_STATUS.PLAYING);
      });
    });

    describe('with mock5 moving left (game over)', () => {
      beforeEach(() => {
        state.game = mock5();

        // create turn
        turn = new Turn(state.game, MOVE_LEFT);
        // moves tiles
        mutations.updateGame(state, turn);
      });

      test('changes status to GAME_STATUS.GAMEOVER', () => {
        expect(isGameOver(state.game)).toBeTruthy();
        expect(state.status).toEqual(GAME_STATUS.GAMEOVER);
      });
    });
  });

  describe('cancelMove', () => {
    describe('with lastTurn from mock1', () => {
      let gameMoves: Movement[];
      let game: Game;
      let lastTurn: LastTurn;

      beforeEach(() => {
        // Define last turn
        game = mock1();
        lastTurn = new LastTurn(game);
        state.game.lastTurn = lastTurn;

        // save current state
        gameMoves = _.cloneDeep(game.moves);
        mutations.cancelMove(state);
      });

      test('replaces game tiles with lastTurn tiles', () => {
        const size = game.size;
        expect(state.game.tiles).toEqual(game.tiles.slice(0, size * size));
      });

      test('replaces game score with lastTurn score', () => {
        expect(state.game.score).toBe(game.score);
      });

      test('removes the first move', () => {
        // timestamp is too sensitive, need to check one by one
        for (let i = 0; i < state.game.moves.length; i++) {
          const thisMv = state.game.moves[i];
          const saveMv = gameMoves[i + 1]; // first move is removed
          expect(thisMv.direction).toEqual(saveMv.direction);
          expect(thisMv.id).toEqual(saveMv.id);
          expect(thisMv.seed).toEqual(saveMv.seed);
          // erf
          expect(thisMv.timestamp - saveMv.timestamp).toBeLessThan(10);
        }
      });

      test('makes game last turn invalid', () => {
        expect(state.game.lastTurn.valid).toBeFalsy();
      });
    });

    describe('when game.lastTurn.valid is false', () => {
      beforeEach(() => {
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
