import { Movement } from './model';

/**
 * Moving left configuration
 */
export const MOVE_LEFT = new Movement(true, false);
/**
 * Moving right configuration
 */
export const MOVE_RIGHT = new Movement(true, true);
/**
 * Moving up configuration
 */
export const MOVE_UP = new Movement(false, false);
/**
 * Moving down configuration
 */
export const MOVE_DOWN = new Movement(false, true);

/**
 * Available board sizes. Must be aligned with SCSS files
 */
export const ALL_SIZES = [3, 4, 5, 6, 8];

/**
 * Game progression status
 */
export const GAME_STATUS = {
  SELECT: 'select',
  PLAYING: 'playing',
  MOVING: 'moving',
  GAMEOVER: 'gameover'
};
