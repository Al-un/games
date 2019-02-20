import state from '@/store/2048/state';
import { GAME_STATUS } from '@/games/2048/constants';
import { Game2048State } from '@/store/2048/types';

describe('2048 state', () => {
  let initialState: Game2048State;
  beforeEach(() => {
    initialState = state();
  });

  test('has mandatory field', () => {
    expect(initialState.size).toBe(4);
    expect(initialState.status).toBe(GAME_STATUS.SELECT);
    expect(initialState.game).toBeDefined();
  });
});
