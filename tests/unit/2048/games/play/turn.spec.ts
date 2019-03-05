import Direction from '@/games/2048/board/direction';
import Turn, {
  getTileFromLoopIndex,
  getTileFromLoop,
  mergeTiles,
  getEmptyRowCells
} from '@/games/2048/play/turn';
import {
  MOVE_LEFT,
  MOVE_RIGHT,
  MOVE_UP,
  MOVE_DOWN
} from '@/games/2048/constants';
import {
  gameNotFull,
  mock1,
  mock2,
  mock3,
  mock1MoveDownEmpties,
  mock1MoveUpEmpties,
  mock1MoveRightEmpties,
  mock1MoveLeftEmpties,
  mock3MoveUpEmpties,
  mock3MoveLeftEmpties,
  mock4,
  gameFullOver
} from '../game/game.mock';
import Tile from '@/games/2048/board/tile';
import Cell from '@/games/2048/board/cell';
import { checkTile } from '../game/game.util';
import { getConsoleErrSpy } from '../../../utils';
import Game from '@/games/2048/game';

const consoleErrSpy: jest.SpyInstance = getConsoleErrSpy();

describe('#getTileFromLoop', () => {
  const game = gameNotFull;
  const array: any[] = [];

  test('works (moving left)', () => {
    // fetch second row
    array[0] = getTileFromLoop(game, 1, 0, MOVE_LEFT);
    array[1] = getTileFromLoop(game, 1, 1, MOVE_LEFT);
    array[2] = getTileFromLoop(game, 1, 2, MOVE_LEFT);

    expect(array[0]).toBeUndefined();
    expect(array[1].val).toBe(4);
    expect(array[2].val).toBe(8);
  });
  test('works (moving right)', () => {
    // fetch second row
    array[0] = getTileFromLoop(game, 1, 0, MOVE_RIGHT);
    array[1] = getTileFromLoop(game, 1, 1, MOVE_RIGHT);
    array[2] = getTileFromLoop(game, 1, 2, MOVE_RIGHT);

    expect(array[0].val).toBe(8);
    expect(array[1].val).toBe(4);
    expect(array[2]).toBeUndefined();
  });
});

describe('#getTileFromLoopIndex', () => {
  const SIZE = 3;
  const LEFT = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  const RIGHT = [2, 1, 0, 5, 4, 3, 8, 7, 6];
  const UP = [0, 3, 6, 1, 4, 7, 2, 5, 8];
  const DOWN = [6, 3, 0, 7, 4, 1, 8, 5, 2];

  const generateIndexes = (direction: Direction): number[] => {
    const indexes: number[] = [];

    for (let i = 0; i < SIZE; i++) {
      for (let j = 0; j < SIZE; j++) {
        const index = getTileFromLoopIndex(SIZE, i, j, direction);
        indexes.push(index);
      }
    }

    return indexes;
  };

  test('with moving left', () => {
    expect(generateIndexes(MOVE_LEFT)).toEqual(LEFT);
  });

  test('with moving right', () => {
    expect(generateIndexes(MOVE_RIGHT)).toEqual(RIGHT);
  });

  test('with moving up', () => {
    expect(generateIndexes(MOVE_UP)).toEqual(UP);
  });

  test('with moving down', () => {
    expect(generateIndexes(MOVE_DOWN)).toEqual(DOWN);
  });
});

describe('#mergeTiles', () => {
  test('works', () => {
    const lastTile = new Tile(3, 2, 0, 4);
    const tile = new Tile(3, 1, 1, 4);

    const merged = mergeTiles(lastTile, tile, 42);
    expect(merged.val).toBe(8);
    expect(merged.merged).toBeTruthy();
    expect(merged.x).toBe(lastTile.x);
    expect(merged.y).toBe(lastTile.y);
    expect(merged.id).toBe(42);
    expect(tile.x).toBe(lastTile.x);
    expect(tile.y).toBe(lastTile.y);
  });
});

describe('#getEmptyRowCells', () => {
  const row = 1;
  const emptyCellsCount = 2;
  const size = 3;
  let empties: Cell[];

  test('works when moving left', () => {
    empties = getEmptyRowCells(row, emptyCellsCount, size, MOVE_LEFT);
    expect(empties).toEqual([new Cell(1, 1), new Cell(2, 1)]);
  });

  test('works when moving right', () => {
    empties = getEmptyRowCells(row, emptyCellsCount, size, MOVE_RIGHT);
    expect(empties).toEqual([new Cell(0, 1), new Cell(1, 1)]);
  });

  test('works when moving up', () => {
    empties = getEmptyRowCells(row, emptyCellsCount, size, MOVE_UP);
    expect(empties).toEqual([new Cell(1, 1), new Cell(1, 2)]);
  });

  test('works when moving down', () => {
    empties = getEmptyRowCells(row, emptyCellsCount, size, MOVE_DOWN);
    expect(empties).toEqual([new Cell(1, 0), new Cell(1, 1)]);
  });
});

describe('Turn', () => {
  let turn: Turn;
  let game: Game;

  describe('With mock1 game', () => {
    describe('Moving left', () => {
      beforeEach(() => {
        game = mock1();
        turn = new Turn(game, MOVE_LEFT);
      });

      test('has a valid last turn (lastTurn not tested here)', () => {
        const lastTurn = turn.lastTurn;
        expect(lastTurn).toBeDefined();
      });

      test('moves two tiles', () => {
        expect(turn.movedCount).toBe(2);
      });

      test('moves tiles properly', () => {
        expect(checkTile(turn.tiles[4], 0, 1, 8)).toBeTruthy();
        expect(checkTile(turn.tiles[5], 1, 1, 4)).toBeTruthy();
        expect(checkTile(turn.tiles[8], 0, 2, 16)).toBeTruthy();
      });

      test('generates empty cells properly', () => {
        expect(turn.emptyCells).toEqual(mock1MoveLeftEmpties);
      });

      test('has no tiles merged, nor score change', () => {
        expect(turn.tiles[16]).toBeUndefined();
        expect(turn.scoreChange).toBe(0);
      });

      test('has a seed tile', () => {
        expect(turn.seed).toBeDefined();
      });

      test('increment tileSeqId by 1 only', () => {
        expect(turn.tileSeqChange).toBe(1);
      });
    });

    describe('Moving right', () => {
      beforeEach(() => {
        turn = new Turn(mock1(), MOVE_RIGHT);
      });

      test('moves three tiles', () => {
        expect(turn.movedCount).toBe(3);
      });

      test('moves tiles properly', () => {
        expect(checkTile(turn.tiles[6], 2, 1, 8)).toBeTruthy();
        expect(checkTile(turn.tiles[7], 3, 1, 4)).toBeTruthy();
        expect(checkTile(turn.tiles[11], 3, 2, 16)).toBeTruthy();
      });

      test('generates empty cells properly', () => {
        expect(turn.emptyCells).toEqual(mock1MoveRightEmpties);
      });

      test('has no tiles merged, nor score change', () => {
        expect(turn.tiles[16]).toBeUndefined();
        expect(turn.scoreChange).toBe(0);
      });
    });

    describe('Moving up', () => {
      beforeEach(() => {
        turn = new Turn(mock1(), MOVE_UP);
      });

      test('moves three tiles', () => {
        expect(turn.movedCount).toBe(3);
      });

      test('moves tiles properly', () => {
        expect(checkTile(turn.tiles[0], 0, 0, 8)).toBeTruthy();
        expect(checkTile(turn.tiles[2], 2, 0, 4)).toBeTruthy();
        expect(checkTile(turn.tiles[6], 2, 1, 16)).toBeTruthy();
      });

      test('generates empty cells properly', () => {
        expect(turn.emptyCells).toEqual(mock1MoveUpEmpties);
      });

      test('has no tiles merged, nor score change', () => {
        expect(turn.tiles[16]).toBeUndefined();
        expect(turn.scoreChange).toBe(0);
      });
    });

    describe('Moving down', () => {
      beforeEach(() => {
        turn = new Turn(mock1(), MOVE_DOWN);
      });

      test('moves three tiles', () => {
        expect(turn.movedCount).toBe(3);
      });

      test('moves tiles properly', () => {
        expect(checkTile(turn.tiles[12], 0, 3, 8)).toBeTruthy();
        expect(checkTile(turn.tiles[10], 2, 2, 4)).toBeTruthy();
        expect(checkTile(turn.tiles[14], 2, 3, 16)).toBeTruthy();
      });

      test('generates empty cells properly', () => {
        expect(turn.emptyCells).toEqual(mock1MoveDownEmpties);
      });

      test('has no tiles merged, nor score change', () => {
        expect(turn.tiles[16]).toBeUndefined();
        expect(turn.scoreChange).toBe(0);
      });
    });
  });

  describe('With mock2 game', () => {
    test('moving left moves zero tiles', () => {
      turn = new Turn(mock2(), MOVE_LEFT);
      expect(turn.movedCount).toBe(0);
    });
  });

  describe('With mock3 game', () => {
    describe('when moving left', () => {
      beforeEach(() => (turn = new Turn(mock3(), MOVE_LEFT)));

      test('moves three tiles', () => {
        expect(turn.movedCount).toBe(2);
      });

      test('moves tiles properly', () => {
        expect(checkTile(turn.tiles[4], 0, 1, 8)).toBeTruthy();
        expect(checkTile(turn.tiles[8], 0, 2, 4)).toBeTruthy();
        expect(checkTile(turn.tiles[12], 0, 3, 4)).toBeTruthy();
      });

      test('has deleted tiles', () => {
        expect(checkTile(turn.tiles[16], 0, 1, 4)).toBeTruthy();
        expect(checkTile(turn.tiles[17], 0, 1, 4)).toBeTruthy();
      });

      test('has score change of 8', () => {
        expect(turn.scoreChange).toBe(8);
      });

      test('has tileSeqChange of 1+1', () => {
        expect(turn.tileSeqChange).toBe(2);
      });

      test('generates empty cells properly', () => {
        expect(turn.emptyCells).toEqual(mock3MoveLeftEmpties);
      });
    });

    describe('when moving up', () => {
      beforeEach(() => {
        turn = new Turn(mock3(), MOVE_UP);
      });

      test('moves four tiles', () => {
        expect(turn.movedCount).toBe(4);
      });

      test('moves & merge tiles properly', () => {
        expect(checkTile(turn.tiles[0], 0, 0, 8)).toBeTruthy();
        expect(checkTile(turn.tiles[2], 2, 0, 8)).toBeTruthy();
      });

      test('has deleted tiles', () => {
        expect(checkTile(turn.tiles[16], 0, 0, 4)).toBeTruthy();
        expect(checkTile(turn.tiles[17], 0, 0, 4)).toBeTruthy();
        expect(checkTile(turn.tiles[18], 2, 0, 4)).toBeTruthy();
        expect(checkTile(turn.tiles[19], 2, 0, 4)).toBeTruthy();
      });

      test('has score change of 16', () => {
        expect(turn.scoreChange).toBe(16);
      });

      test('has tileSeqChange of 2+1', () => {
        expect(turn.tileSeqChange).toBe(3);
      });

      test('generates empty cells properly', () => {
        expect(turn.emptyCells).toEqual(mock3MoveUpEmpties);
      });
    });
  });

  describe('With mock4 game', () => {
    describe('when moving up', () => {
      beforeEach(() => {
        turn = new Turn(mock4(), MOVE_UP);
      });

      test('4 + 4 = 8 is not merged with the next 8', () => {
        expect(checkTile(turn.tiles[0], 0, 0, 8)).toBeTruthy();
        expect(checkTile(turn.tiles[4], 0, 1, 8)).toBeTruthy();
      });

      test('has deleted tiles', () => {
        expect(checkTile(turn.tiles[16], 0, 0, 4)).toBeTruthy();
        expect(checkTile(turn.tiles[17], 0, 0, 4)).toBeTruthy();
      });
    });
  });

  describe('With gameFullOver (should not be possible)', () => {
    beforeEach(() => {
      turn = new Turn(gameFullOver, MOVE_DOWN);
    });

    test('has one console.error output', () => {
      expect(consoleErrSpy).toHaveBeenCalledTimes(1);
    });
  });
});
