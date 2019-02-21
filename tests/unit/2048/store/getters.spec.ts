import getters from '@/store/2048/getters';
import { Game2048State } from '@/store/2048/types';
import state, { initialState } from '@/store/2048/state';
import { mock1 } from '../games/game/game.mock';
import { GAME_STATUS } from '@/games/2048/constants';

describe('2048 getters', () => {
  let currentState: Game2048State;

  describe('without game', () => {
    beforeEach(() => {
      currentState = initialState();
    });

    test('isCancelable is false', () => {
      expect(getters.isCancelable(currentState)).toBeFalsy();
    });
  });

  describe('with mock1 game', () => {
    beforeEach(() => {
      currentState = initialState();
      currentState.game = mock1();
    });

    test('isCancelable is true only if playing', () => {
      // state = select
      expect(getters.isCancelable(currentState)).toBeFalsy();
      currentState.status = GAME_STATUS.MOVING;
      expect(getters.isCancelable(currentState)).toBeFalsy();

      currentState.status = GAME_STATUS.PLAYING;
      expect(getters.isCancelable(currentState)).toBeTruthy();
    });
  });
});
