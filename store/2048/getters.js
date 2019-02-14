import { GAME_STATUS } from './utils/constant';

export const isCancelable = state =>
  state.status === GAME_STATUS.PLAYING && state.lastTurn;

export default {
  isCancelable
};
