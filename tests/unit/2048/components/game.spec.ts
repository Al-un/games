import { mount, Wrapper, createLocalVue } from '@vue/test-utils';
import Vuex, { Store } from 'vuex';

import Game from '@/components/2048/Game.vue';
import Board from '@/components/2048/Board.vue';
import BoardHeader from '@/components/2048/BoardHeader.vue';
import GameControl from '@/components/2048/GameControl.vue';
import GameOver from '@/components/2048/GameOver.vue';
import { RootState } from '@/store/types';
import { mock2048Module } from '../store/store.mock';
import { Game2048Module } from '@/store/2048/types';
import { GAME_STATUS } from '@/games/2048/constants';

let wrapper: Wrapper<Game>;

const localVue = createLocalVue();
localVue.use(Vuex);
let store: Store<RootState>;
let module2048: Game2048Module;

describe('Game', () => {
  beforeEach(() => {
    module2048 = mock2048Module();

    store = new Vuex.Store({ modules: { '2048': module2048 } });
    wrapper = mount(Game, { localVue, store });
  });

  test('is a Vue component', () => {
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  test('has a BoardHeader', () => {
    expect(wrapper.findAll(BoardHeader).length).toBe(1);
  });

  test('has a Board', () => {
    expect(wrapper.findAll(Board).length).toBe(1);
  });

  test('has a GameControl', () => {
    expect(wrapper.findAll(GameControl).length).toBe(1);
  });

  test('has a hidden GameOver', () => {
    const gameOver = wrapper.find(GameOver);
    expect(gameOver.exists()).toBeFalsy();
  });

  test('displays GameOver when state.status is gameover', () => {
    module2048.state.status = GAME_STATUS.GAMEOVER;
    const gameOver = wrapper.find(GameOver);
    expect(gameOver.exists()).toBeTruthy();
    expect(gameOver.isVisible()).toBeTruthy();
  });
});
