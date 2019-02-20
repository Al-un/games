import Game from '@/games/2048/game';
import Tile from '@/games/2048/board/tile';
import Cell from '@/games/2048/board/cell';
import Movement from '@/games/2048/play/movement';
import LastTurn from '@/games/2048/game/last-turn';
import { GAME_STATUS } from '@/games/2048/constants';

// ============================================================================
//   Testing Game over
// ============================================================================

// to ensure unique tiles
let index = 0;

const generateTile = (x: number, y: number, val: number): Tile => {
  const tile = new Tile(x, y, index);
  index++;
  tile.val = val;
  return tile;
};

export const gameNotFull = new Game(3, []);

gameNotFull.tiles = Array(9);
gameNotFull.tiles[4] = generateTile(1, 1, 4);
gameNotFull.tiles[5] = generateTile(2, 1, 8);

export const gameFullOver = new Game(3, []);
gameFullOver.tiles = [
  generateTile(0, 0, 2),
  generateTile(1, 0, 8),
  generateTile(2, 0, 4),

  generateTile(0, 1, 4),
  generateTile(1, 1, 2),
  generateTile(2, 1, 16),

  generateTile(0, 2, 2),
  generateTile(1, 2, 4),
  generateTile(2, 2, 2)
];

export const gameFullNotOverMoveHorizontal = new Game(3, []);
gameFullNotOverMoveHorizontal.tiles = [
  generateTile(0, 0, 2),
  generateTile(1, 0, 16),
  generateTile(2, 0, 4),

  generateTile(0, 1, 4),
  generateTile(1, 1, 8),
  generateTile(2, 1, 8),

  generateTile(0, 2, 2),
  generateTile(1, 2, 4),
  generateTile(2, 2, 2)
];

export const gameFullNotOverMoveVertical = new Game(3, []);
gameFullNotOverMoveVertical.tiles = [
  generateTile(0, 0, 2),
  generateTile(1, 0, 8),
  generateTile(2, 0, 4),

  generateTile(0, 1, 4),
  generateTile(1, 1, 8),
  generateTile(2, 1, 16),

  generateTile(0, 2, 2),
  generateTile(1, 2, 4),
  generateTile(2, 2, 2)
];

/**
 * Deleted tiles can be combined but it should game over anyway
 */
export const gameOverWithDeletedTiles = new Game(3, []);
gameOverWithDeletedTiles.tiles = [
  generateTile(0, 0, 2),
  generateTile(1, 0, 4),
  generateTile(2, 0, 2),

  generateTile(0, 1, 8),
  generateTile(1, 1, 16),
  generateTile(2, 1, 8),

  generateTile(0, 2, 4),
  generateTile(1, 2, 8),
  generateTile(2, 2, 2),

  generateTile(0, 2, 4),
  generateTile(1, 0, 4),
];

// ============================================================================
//   Testing tile printing
// ============================================================================

export const gameNotFullPrint = '| 0 0 0 |\n| 0 4 8 |\n| 0 0 0 |\n';
export const gameFullOverPrint = '| 2 8 4 |\n| 4 2 16 |\n| 2 4 2 |\n';

// ============================================================================
//    Testing turns
//  ============================================================================
/**
 * Some game configuration
 */
export const mock1Print = '| 0 0 0 0 |\n| 8 0 4 0 |\n| 0 0 16 0 | 0 0 0 0|\n';
export const mock1 = (): Game => {
  const game = new Game(4, []);
  game.tiles = [];
  game.tiles[4] = generateTile(0, 1, 8);
  game.tiles[6] = generateTile(2, 1, 4);
  game.tiles[10] = generateTile(2, 2, 16);

  game.moves.unshift(new Movement('left', 1));
  game.moves.unshift(new Movement('up', 2));
  game.moves.unshift(new Movement('right', 3));
  game.moves.unshift(new Movement('left', 4));

  game.score = 38;

  const lastTurnTiles = [];
  lastTurnTiles[4] = generateTile(0, 1, 4);
  lastTurnTiles[5] = generateTile(1, 1, 4);
  lastTurnTiles[6] = generateTile(2, 1, 4);
  lastTurnTiles[10] = generateTile(2, 2, 16);

  game.lastTurn = new LastTurn(lastTurnTiles, 32);

  return game;
};

/**
 * Empty after moving left in Mock1
 */
export const mock1MoveLeftEmpties = [
  new Cell(0, 0),
  new Cell(1, 0),
  new Cell(2, 0),
  new Cell(3, 0),

  new Cell(2, 1),
  new Cell(3, 1),

  new Cell(1, 2),
  new Cell(2, 2),
  new Cell(3, 2),

  new Cell(0, 3),
  new Cell(1, 3),
  new Cell(2, 3),
  new Cell(3, 3)
];

/**
 * Empty after moving right in Mock1
 */
export const mock1MoveRightEmpties = [
  new Cell(0, 0),
  new Cell(1, 0),
  new Cell(2, 0),
  new Cell(3, 0),

  new Cell(0, 1),
  new Cell(1, 1),

  new Cell(0, 2),
  new Cell(1, 2),
  new Cell(2, 2),

  new Cell(0, 3),
  new Cell(1, 3),
  new Cell(2, 3),
  new Cell(3, 3)
];

/**
 * Empty after moving up in Mock1
 */
export const mock1MoveUpEmpties = [
  new Cell(0, 1),
  new Cell(0, 2),
  new Cell(0, 3),

  new Cell(1, 0),
  new Cell(1, 1),
  new Cell(1, 2),
  new Cell(1, 3),

  new Cell(2, 2),
  new Cell(2, 3),

  new Cell(3, 0),
  new Cell(3, 1),
  new Cell(3, 2),
  new Cell(3, 3)
];

/**
 * Empty after moving down in Mock1
 */
export const mock1MoveDownEmpties = [
  new Cell(0, 0),
  new Cell(0, 1),
  new Cell(0, 2),

  new Cell(1, 0),
  new Cell(1, 1),
  new Cell(1, 2),
  new Cell(1, 3),

  new Cell(2, 0),
  new Cell(2, 1),

  new Cell(3, 0),
  new Cell(3, 1),
  new Cell(3, 2),
  new Cell(3, 3)
];

/**
 * When moving left, no tile is moved
 */
export const mock2 = (): Game => {
  const game = new Game(4, []);
  game.tiles = [];
  game.tiles[4] = generateTile(0, 1, 8);
  game.tiles[5] = generateTile(1, 1, 16);
  game.tiles[8] = generateTile(0, 2, 4);

  return game;
};
export const mock2Print = '| 0 0 0 0 |\n| 8 16 0 0 |\n| 4 0 0 0 | 0 0 0 0|\n';

/**
 * When moving left, one tile is merged
 * When moving down, two tiles are merged
 */
export const mock3 = (): Game => {
  const game = new Game(4, []);
  game.tiles = [];
  game.tiles[4] = generateTile(0, 1, 4);
  game.tiles[6] = generateTile(2, 1, 4);
  game.tiles[8] = generateTile(0, 2, 4);
  game.tiles[14] = generateTile(2, 3, 4);

  game.score = 13; // impossible value
  game.tileSeqId = 6;

  game.moves = [];
  game.moves.unshift(new Movement('left', 1));
  game.moves.unshift(new Movement('right', 2));

  return game;
};
export const mock3Print = '| 0 0 0 0 |\n| 4 0 4 0 |\n| 4 0 0 0 | 0 0 4 0|\n';

export const mock3MoveLeftEmpties = [
  new Cell(0, 0),
  new Cell(1, 0),
  new Cell(2, 0),
  new Cell(3, 0),

  new Cell(1, 1),
  new Cell(2, 1),
  new Cell(3, 1),

  new Cell(1, 2),
  new Cell(2, 2),
  new Cell(3, 2),

  new Cell(1, 3),
  new Cell(2, 3),
  new Cell(3, 3)
];

export const mock3MoveUpEmpties = [
  new Cell(0, 1),
  new Cell(0, 2),
  new Cell(0, 3),

  new Cell(1, 0),
  new Cell(1, 1),
  new Cell(1, 2),
  new Cell(1, 3),

  new Cell(2, 1),
  new Cell(2, 2),
  new Cell(2, 3),

  new Cell(3, 0),
  new Cell(3, 1),
  new Cell(3, 2),
  new Cell(3, 3)
];

/**
 * When moving up, 4 + 4 merged into 8 should not merge into the next 8
 */
export const mock4 = (): Game => {
  const game = new Game(4, []);
  game.tiles = [];
  game.tiles[4] = generateTile(0, 1, 4);
  game.tiles[8] = generateTile(0, 2, 4);
  game.tiles[12] = generateTile(0, 3, 8);

  return game;
};

/**
 * When moving up, gaming is over
 */
export const mock5 = (): Game => {
  const game = new Game(3, []);
  game.tiles = [
    generateTile(0, 0, 2),
    generateTile(1, 0, 4),
    generateTile(2, 0, 2),

    generateTile(0, 1, 8),
    generateTile(1, 1, 16),
    generateTile(2, 1, 8),

    generateTile(0, 2, 2),
    generateTile(1, 2, 2),
    generateTile(2, 2, 8)
  ];

  return game;
};
