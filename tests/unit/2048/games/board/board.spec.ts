import Tile from '@/games/2048/board/tile';
import Board, { getTileIndex, printTiles } from '@/games/2048/board';
import {
  gameNotFull,
  gameFullOver,
  gameFullOverPrint,
  gameNotFullPrint
} from '../game/game.mock';

describe('Board', () => {
  const size = 4;
  let board: Board;

  describe('at initialisation', () => {
    beforeEach(() => {
      board = new Board(size);
    });

    test('has size*size tiles', () => {
      expect(board.tiles.length).toBe(size * size);
    });
  });
});

describe('#getTileIndex', () => {
  test('works', () => {
    const tile = new Tile(3, 2, 0);
    expect(getTileIndex(4, tile)).toBe(11);
  });
});

describe('#printTiles', () => {
  test('works with full board', () => {
    const game = gameFullOver;
    const print = printTiles(game.size, game.tiles);
    expect(print).toEqual(gameFullOverPrint);
  });

  test('works with partial board', () => {
    const game = gameNotFull;
    const print = printTiles(game.size, game.tiles);
    expect(print).toEqual(gameNotFullPrint);
  });
});
