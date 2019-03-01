import Tile from '@/games/2048/board/tile';

/**
 * @param tile checked tile
 * @param x check x coordinate
 * @param y check y coordinate
 * @param val check tile val
 */
export const checkTile = (
  tile: Tile,
  x: number,
  y: number,
  val: number
): boolean => {
  if (tile === undefined) {
    return false;
  }
  return tile.x === x && tile.y === y && tile.val === val;
};
