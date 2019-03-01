import Seed, { generateSeed } from '@/games/2048/play/seed';
import Cell from '@/games/2048/board/cell';
import Tile from '@/games/2048/board/tile';

describe('Seed', () => {
  test('properly initialises', () => {
    const seed = new Seed(1, 1, 2);
    expect(seed).toBeTruthy();
  });
});

describe('#generateSeed', () => {
  let seed: Tile;
  const TILE_ID = 4;

  beforeEach(() => {
    const emptyCoords: Cell[] = [new Cell(0, 1), new Cell(1, 2)];
    seed = generateSeed(emptyCoords, TILE_ID);
  });

  test('assigns proper ID', () => {
    expect(seed.id).toBe(TILE_ID);
  });

  test('assigns valid coordinates', () => {
    const hasFirstCoordinates = seed.x === 0 && seed.y === 1;
    const hasSndCoordinates = seed.x === 1 && seed.y === 2;
    expect(hasFirstCoordinates || hasSndCoordinates).toBeTruthy();
  });
});
