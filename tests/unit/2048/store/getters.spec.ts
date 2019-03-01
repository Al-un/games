import getters from '@/store/2048/getters';
import { Game2048State } from '@/store/2048/types';
import { initialState } from '@/store/2048/state';
import { mock1 } from '../games/game/game.mock';

describe('2048 getters', () => {
  let currentState: Game2048State;

  describe('when game is new', () => {
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

    test('isCancelable is lastTurn.valid ', () => {
      currentState.game.lastTurn.valid = false;
      expect(getters.isCancelable(currentState)).toBeFalsy();
      currentState.game.lastTurn.valid = true;
      expect(getters.isCancelable(currentState)).toBeTruthy();
    });
  });
});
