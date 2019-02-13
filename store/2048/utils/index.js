import { Tile } from './model';

/**
 *
 * @param {Array} emptyCoords list of empty {x, y} coordinates
 * @param {Number} id seeded tile ID
 * @return {Tile} seeded tile
 */
export const generateSeed = (emptyCoords, id = 0) => {
  const randIdx = Math.floor(Math.random() * (emptyCoords.length - 1));
  // console.log('emptyCoords', emptyCoords);
  // console.log('randIdx', randIdx);
  const coordinates = emptyCoords[randIdx];
  const seed = new Tile(coordinates.x, coordinates.y, id);
  console.log(`Seed ${seed.val} at (${seed.x}, ${seed.y}) from`, emptyCoords);

  return seed;
};

export const clearDeleted = tiles => {
  tiles.forEach((tile, index, nextTiles) => {
    if (tile.deleted) {
      nextTiles.splice(index, 1);
    }
  });
  return tiles;
};

export const printTiles = (size, tiles) => {
  for (let i = 0; i < size; i++) {
    const row = [];
    for (let j = 0; j < size; j++) {
      const matchingTiles = tiles.filter(tile => tile.x === j && tile.y === i);
      row.push(matchingTiles.length ? `${matchingTiles.shift().val}` : '0');
    }
    console.log(`[${i}] | ${row.join(' ')} |`);
  }
};

/**
 * Check if current tiles represent a Game Over. To be Game Over, no moves can
 * be possible which requires two conditions:
 * - Board is full
 * - Each tile has no tile of same value among its direct neighbours
 *
 * @param {Number} size
 * @param {Array} tiles
 * @returns {Boolean} true if Game Over
 */
export const isGameOver = (size, tiles) => {
  // Board not full yet
  if (tiles.length < size * size) {
    return false;
  }

  // Check tiles neighbourhood
  const grid = [];
  for (let i = 0; i < size; i++) {
    grid[i] = [];
  }
  tiles.forEach(tile => {
    grid[tile.y][tile.x] = tile.val;
  });
  console.log('Grid', grid);

  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      const thisVal = grid[i][j];
      const left = i > 0 ? grid[i - 1][j] === thisVal : false;
      const right = i < size - 1 ? grid[i + 1][j] === thisVal : false;
      const top = j > 0 ? grid[i][j - 1] === thisVal : false;
      const bottom = j < size - 1 ? grid[i][j + 1] === thisVal : false;
      if (top || left || right || bottom) {
        // console.log(`Adjacent neighbours found at {${i}, ${j}}`);
        return false;
      }
    }
  }

  return true;
};
