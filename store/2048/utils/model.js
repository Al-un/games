/**
 * Three mains objects:
 * - Movement: wrapping left, right, up, down movement
 * - Tile: representing a valued coordinate
 * - Grid: built at each move
 */

// -----------------------------------------------------------------------------
// Movements
// -----------------------------------------------------------------------------

/**
 * Qualify a game movement. A movement has two parameters:
 * - horizontal: true for left/right, false for up/down
 * - reverse: true when move goes toward _max\_value_ (right, down), false when
 * move goes toward zero (left, up)
 */
export class Movement {
  constructor(horizontal, reverse) {
    this.horizontal = horizontal;
    this.reverse = reverse;
  }

  /**
   * Sorting function reorganise tiles for a given row or column. For a horizontal
   * move, tiles are grouped by row (y coordinates). Moving left need to order
   * tiles from lower columns to higher column while moving right needs the
   * opposite
   *
   * Process is similar for moving up and down.
   *
   * @returns {Function} Tile sorting function for this movement
   */
  getSortFunction() {
    return this.horizontal
      ? !this.reverse
        ? (t1, t2) => t1.x - t2.x
        : (t1, t2) => t2.x - t1.x
      : !this.reverse
        ? (t1, t2) => t1.y - t2.y
        : (t1, t2) => t2.y - t1.y;
  }

  /**
   * Fetch tile coordinate for grouping tiles when building the grid. Moving
   * horizontally groups tile per row, hence grouping on `y` coordinate. Similarly,
   * moving vertically groups per column, `x` coodinate
   *
   * @param {Tile} tile input tile
   * @returns {Number} tile relevant coordinate
   */
  getAxis(tile) {
    return this.horizontal ? tile.y : tile.x;
  }
}

// -----------------------------------------------------------------------------
// Tile
// -----------------------------------------------------------------------------

/**
 * A tile is a coordinate with a value.
 * - `x` is column axis (0 = left, _max\_value_ = right)
 * - `y` is row axis (0 = top, _max\_value_ = bottom)
 */
export class Tile {
  /**
   * Initialise a Tile
   * @todo Randomise 2 or 4 as initial value
   * @param {Number} x x coordinate
   * @param {Number} y y coordinate
   * @param {Number} initialValue initial tile value. Default is 2
   */
  constructor(x, y, id) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.deleted = false;
    this.moved = false;

    // 12% of spawning 4
    this.val = Math.random() < 0.88 ? 2 : 4;
  }
}

/**
 * Convenience method to display tile coordinate. Method is not attached to
 * Tile class because it is better to store plain object in Vuex (like in Redux)
 *
 * @param {Tile} tile input tile
 * @returns {String} tile coordinates
 */
export const printTile = tile => `(${tile.x}, ${tile.y})`;

// -----------------------------------------------------------------------------
// Grid
// -----------------------------------------------------------------------------
/**
 * Convert a list of `Tile` into a grid to better handle tile movement. Unlike a
 * list of `Tile`, a grid depends on a movement
 *
 * By convention, "row" name is used
 */
export class Grid {
  /**
   *
   * @param {Number} size
   * @param {Array} tiles
   * @param {Move} movement
   */
  constructor(size, tiles, movement) {
    // initialise grid
    this.size = size;
    this.movement = movement;
    this.grid = [];
    this.score = 0;
    for (let i = 0; i < size; i++) {
      this.grid[i] = [];
    }

    // group tiles per row or column
    this.groupTiles(tiles);
    // this.printGrid();

    // merge tiles
    this.mergeTiles();
    // this.printGrid();

    // move tiles
    this.moveTiles();
    // this.printGrid();
  }

  /**
   * Group tiles by row or column.
   * @param {Array} tiles
   */
  groupTiles(tiles) {
    // group by row or column
    tiles.filter(tile => !tile.deleted).forEach(tile => {
      // reset flags
      tile.moved = false;
      tile.merged = false;
      // group by axis
      const axis = this.movement.getAxis(tile);
      this.grid[axis].push(tile);
    });
  }

  /**
   *
   */
  mergeTiles() {
    this.grid.forEach(row => {
      // sort row first
      row.sort(this.movement.getSortFunction());

      // ignore last tile
      let i = 0;
      while (i < row.length - 1) {
        const tile = row[i];
        const next = row[i + 1];
        if (tile.val === next.val) {
          tile.val = tile.val + next.val;
          this.score += tile.val;
          tile.merged = true;
          next.deleted = true;
          console.log(
            `[2048] Grid: Tile ${printTile(next)} merged > ${printTile(tile)}`
          );
          i = i + 2;
        } else {
          i++;
        }
      }
    });
  }

  moveTiles() {
    this.grid.forEach(row => {
      let index = this.movement.reverse ? this.size - 1 : 0;

      for (let i = 0; i < row.length; i++) {
        const tile = row[i];
        // move horizontally or vertically
        if (this.movement.horizontal) {
          tile.moved = tile.x !== index;
          tile.x = index;
        } else {
          tile.moved = tile.y !== index;
          tile.y = index;
        }

        // shift index if next tile is not deleted
        if (i < row.length - 1 && !row[i + 1].deleted) {
          index = index + (this.movement.reverse ? -1 : 1);
        }
      }
    });
  }

  /**
   * @returns {Array} flatten list of all tiles
   */
  get tiles() {
    return this.grid.reduce((all, row) => all.concat(row));
  }

  /**
   * @returns number of moved tiles
   */
  get movedTilesCount() {
    return this.tiles.filter(tile => tile.moved).length;
  }

  get emptyCoordinates() {
    return this.grid
      .map((row, index) => {
        const emptyCoordinates = [];
        const nonDeletedCount = row.filter(tile => !tile.deleted).length;
        for (let i = 0; i < this.size - nonDeletedCount; i++) {
          const emptyIdx = this.movement.reverse ? i : this.size - 1 - i;
          const emptyCoord = this.movement.horizontal
            ? { x: emptyIdx, y: index }
            : { x: index, y: emptyIdx };
          emptyCoordinates.push(emptyCoord);
        }
        return emptyCoordinates;
      })
      .reduce((allCoords, rowEmptyCoords) => allCoords.concat(rowEmptyCoords));
  }

  /**
   * User friendly grid representation
   */
  printGrid() {
    const str = this.grid
      .map((row, index) => {
        return (
          `[${index}]` +
          row
            .map(
              tile =>
                `{${printTile(tile)}: ${tile.val} ${tile.deleted ? 'D' : ''}${
                  tile.merged ? 'M' : ''
                }}`
            )
            .join(' ')
        );
      })
      .join('\n');
    console.log(str);
  }
}
