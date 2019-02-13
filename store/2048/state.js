import { GAME_STATUS } from './utils/constant';

/**
 * Initial state
 */
export default () => ({
  size: 4,
  score: 0,
  tiles: [],
  moves: [],
  tileId: 0,
  lastTurn: undefined,
  status: GAME_STATUS.SELECT
});
