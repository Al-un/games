import { initialState } from '@/store/2048/state';
import { GAME_STATUS } from '@/games/2048/constants';
import { Game2048State } from '@/store/2048/types';

describe('2048 state', () => {
  let state: Game2048State;
  beforeEach(() => {
    state = initialState();
  });

  test('has mandatory field', () => {
    expect(state.size).toBe(4);
    expect(state.status).toBe(GAME_STATUS.SELECT);
    expect(state.game).toBeDefined();
  });
});
