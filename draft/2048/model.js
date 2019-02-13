/**
 * (x, y) coordinate wrapper class
 */
class Coordinate {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

/**
 * A tile is a coordinate with a value.
 */
class Tile {
  /**
   * Initialise a Tile with value 2
   * @todo Randomise 2 or 4 as initial value
   * @param {Coordinate} coord starting coordinates
   */
  constructor(coord) {
    this.x = coord.x;
    this.y = coord.y;
    this.val = 2;
    this.merged = false;
    this.deleted = false;
  }

  print() {
    return `(${this.x}, ${this.y})`;
  }
}

/**
 * Board handles all the tiles
 */
class Board {
  /**
   * Initialise a 2048 board
   * @param {Number} size board size (default = 4)
   */
  constructor(size = 4) {
    this.size = size;
    this.tiles = [];

    // Convenience
    this.allCoordinates = [];
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        this.allCoordinates.push(new Coordinate(i, j));
      }
    }
  }

  /**
   * Fetch the `Coordinate[]` list of empty coordinates
   */
  get emptyCoordinates() {
    const empties = [];
    this.allCoordinates.forEach(coord => {
      const tileIdx = this.tiles.findIndex(
        tile => tile.x === coord.x && tile.y === coord.y
      );
      if (tileIdx === -1) {
        empties.push(coord);
      }
    });
    return empties;
  }

  /**
   * Seed a new tile
   */
  seed() {
    const empties = this.emptyCoordinates;
    const randIdx = Math.floor(Math.random() * (empties.length - 1));
    const coordinates = empties[randIdx];
    const newTile = new Tile(coordinates);
    console.log(`Seeding ${newTile.val} at (${newTile.x}, ${newTile.y})`);
    this.tiles.push(newTile);
  }

  /**
   * Print current board
   */
  print() {
    for (let i = 0; i < this.size; i++) {
      const row = [];
      for (let j = 0; j < this.size; j++) {
        const tiles = this.tiles.filter(tile => tile.x === j && tile.y === i);
        row.push(tiles.length ? `${tiles.shift().val}` : '0');
      }
      console.log(row);
    }
  }

  clearDeleted() {
    this.tiles.forEach((tile, index, nextTiles) => {
      if (tile.deleted) {
        nextTiles.splice(index, 1);
      }
    });
  }

  merge(grid, horizontal, reverse) {
    grid.forEach((row, index) => {
      let i = 0;
      // ignore last tile
      while (i < row.length - 1) {
        const tile = row[i];
        const next = row[i + 1];
        if (tile.val === next.val) {
          console.log(`Tile (${next.print()}) merged into (${tile.print()})`);

          // merge tile
          tile.val = tile.val + next.val;
          tile.merged = true;

          // next tile is deleted
          next.deleted = true;
          row.splice(i + 1, 1);

          // move remaining tile
          for (let j = i + 1; j < row.length; j++) {
            const movedTile = row[j];
            const oldX = movedTile.x;
            const oldY = movedTile.y;
            if (horizontal) {
              movedTile.x = reverse ? movedTile.x + 1 : movedTile.x - 1;
            } else {
              movedTile.y = reverse ? movedTile.y + 1 : movedTile.y - 1;
            }

            console.log(
              `Tile (${oldX}, ${oldY}) moved to (${movedTile.print()}) due to merge`
            );
          }
        }
        i++;
      }

      // print
      const rowStr = row.map(tile => tile.print()).join(', ');
      console.log(`Merging Grid[${index}] ${rowStr}`);
    });
  }

  /**
   *
   * @param {Function} sortFn sorting function
   */
  getGrid(horizontal, reverse) {
    let sortFn;
    if (horizontal) {
      sortFn = !reverse
        ? (t1, t2) => (t1.y - t2.y !== 0 ? t1.y - t2.y : t1.x - t2.x)
        : (t1, t2) => (t1.y - t2.y !== 0 ? t1.y - t2.y : t2.x - t1.x);
    } else {
      sortFn = !reverse
        ? (t1, t2) => (t1.x - t2.x !== 0 ? t1.x - t2.x : t1.y - t2.y)
        : (t1, t2) => (t1.x - t2.x !== 0 ? t1.x - t2.x : t2.y - t1.y);
    }
    this.tiles.sort(sortFn);
    // console.log(this.tiles);

    const idx = Array(this.size).fill(reverse ? this.size - 1 : 0);
    const grid = [];
    this.tiles.forEach(tile => {
      const axis = horizontal ? tile.y : tile.x;
      // init grid
      if (!grid[axis]) {
        grid[axis] = [];
      }

      // move horizontally or vertically
      const oldX = tile.x;
      const oldY = tile.y;
      if (horizontal) {
        tile.x = idx[axis];
      } else {
        tile.y = idx[axis];
      }

      // debug
      console.log(`Tile (${oldX}, ${oldY}) moved to (${tile.print()})`);

      // move to left/up or right/down
      if (reverse) {
        idx[axis]--;
      } else {
        idx[axis]++;
      }

      // add to grid
      grid[axis].push(tile);
    });

    // printing grid
    grid.forEach((row, index) => {
      const rowStr = row.map(tile => tile.print()).join(', ');
      console.log(`Building Grid[${index}] ${rowStr}`);
    });

    return grid;
  }

  moveLeft() {
    const grid = this.getGrid(true, false);
    // console.log('Grid:', grid);
    this.merge(grid, true, false);
    this.clearDeleted();
    this.seed();
  }

  moveRight() {
    const grid = this.getGrid(true, true);
    // console.log('Grid:', grid);
    this.merge(grid, true, true);
    this.clearDeleted();
    this.seed();
  }

  moveUp() {
    const grid = this.getGrid(false, false);
    // console.log('Grid:', grid);
    this.merge(grid, false, false);
    this.clearDeleted();
    this.seed();
  }

  moveDown() {
    const grid = this.getGrid(false, true);
    // console.log('Grid:', grid);
    this.merge(grid, false, true);
    this.clearDeleted();
    this.seed();
  }
}

module.exports = {
  Board
};
