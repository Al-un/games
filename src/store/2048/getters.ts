import { Game2048Getter } from './types';

const getters2048: Game2048Getter = {
  isCancelable: state => state.game.lastTurn.valid
};

export default getters2048;
