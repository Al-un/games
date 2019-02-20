import Game, { isGameOver } from '@/games/2048/game';
import Seed from '@/games/2048/play/seed';
import {
  gameFullNotOverMoveHorizontal,
  gameFullOver,
  gameNotFull,
  gameFullNotOverMoveVertical,
  gameOverWithDeletedTiles
} from './game.mock';
import Tile from '@/games/2048/board/tile';

describe('Game', () => {
  const size = 4;
  let game: Game;

  describe('at initialisation', () => {
    beforeEach(() => {
      const seed1 = new Tile(1, 1, 0);
      const seed2 = new Tile(3, 2, 1);
      game = new Game(size, [seed1, seed2]);
    });

    test('has seeds at proper index', () => {
      const tileSeed1 = game.tiles[4 * 1 + 1];
      const tileSeed2 = game.tiles[4 * 2 + 3];
      expect(tileSeed1).toBeDefined();
      expect(tileSeed2).toBeDefined();
      // expect(tileSeed1.val).toBe(2);
      // expect(tileSeed2.val).toBe(4);
    });

    test('has a zero score', () => {
      expect(game.score).toBe(0);
    });

    test('has no movement', () => {
      expect(game.moves).toBeDefined();
      expect(game.moves.length).toBe(0);
    });

    test('has no lastTurn', () => {
      expect(game.lastTurn).toBeUndefined();
    });
  });
});

describe('#isGameOver', () => {
  test('works', () => {
    expect(isGameOver(gameFullNotOverMoveHorizontal)).toBeFalsy();
    expect(isGameOver(gameFullNotOverMoveVertical)).toBeFalsy();
    expect(isGameOver(gameFullOver)).toBeTruthy();
    expect(isGameOver(gameNotFull)).toBeFalsy();
  });

  test('ignores deleted tiles', () => {
    expect(isGameOver(gameOverWithDeletedTiles)).toBeTruthy();
  });
});
