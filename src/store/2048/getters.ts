import { Game2048Getter } from './types';
import { GAME_STATUS } from '@/games/2048/constants';

const getters2048: Game2048Getter = {
  isCancelable: state => {
    return (
      state.game.lastTurn !== undefined && state.status === GAME_STATUS.PLAYING
    );
  }
};

export default getters2048;
