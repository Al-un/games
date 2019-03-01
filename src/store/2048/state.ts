import { Game2048State } from './types';
import { GAME_STATUS } from '@/games/2048/constants';
import Game from '@/games/2048/game';

/**
 * Initial state
 */
export const initialState = (): Game2048State => ({
  status: GAME_STATUS.SELECT,
  game: new Game(3, []),
  size: 4
});

export const state = initialState();

export default state;
