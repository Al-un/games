import Tile, { printTile, cloneTile } from '@/games/2048/board/tile';

describe('Tile', () => {
  let tile: Tile;
  const tileX = 3;
  const tileY = 2;
  const tileId = 7;

  describe('with default value', () => {
    beforeEach(() => {
      tile = new Tile(tileX, tileY, tileId);
    });

    describe('at initialisation', () => {
      test('properly initialises', () => {
        expect(tile.x).toBe(tileX);
        expect(tile.y).toBe(tileY);
        expect(tile.id).toBe(tileId);
      });

      test('has 2 or 4 as default value', () => {
        const val = tile.val;
        expect([2, 4].includes(val)).toBeTruthy();
      });

      test('is not merged', () => {
        expect(tile.merged).toBeFalsy();
      });

      test('has randomly 2 or 4 as initial value', () => {
        let countOfTwo = 0;
        let countOfFour = 0;

        for (let i = 0; i < 100; i++) {
          const bunchTile = new Tile(1, 1, 1);
          expect([2, 4].includes(bunchTile.val)).toBeTruthy();
          if (bunchTile.val === 2) {
            countOfTwo++;
          } else if (bunchTile.val === 4) {
            countOfFour++;
          }
        }

        expect(countOfTwo).toBeGreaterThan(0);
        expect(countOfFour).toBeGreaterThan(0);
      });
    });
  });

  describe('with forced value', () => {
    beforeEach(() => {
      tile = new Tile(tileX, tileY, tileId, 52);
    });

    test('has defined value instead of 2 or 4', () => {
      expect(tile.val).toBe(52);
    });
  });
});

describe('#printTile', () => {
  test('works', () => {
    const tile = new Tile(3, 2, 0);
    const expected = '(3, 2)';
    expect(printTile(tile)).toBe(expected);
  });
});

describe('#cloneTile', () => {
  test('works', () => {
    const tile = new Tile(4, 3, 1, 21);
    const clone = cloneTile(tile);
    expect(clone).toEqual(clone);
  });
});
