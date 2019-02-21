import { shallowMount, Wrapper, createLocalVue } from '@vue/test-utils';
import Vuex, { Store } from 'vuex';

import GameOver from '@/components/2048/GameOver.vue';
import { RootState } from '@/store/types';
import { mock2048Module } from '../store/store.mock';
import { Game2048Module } from '@/store/2048/types';
import Movement from '@/games/2048/play/movement';

let wrapper: Wrapper<GameOver>;

const localVue = createLocalVue();
localVue.use(Vuex);
let store: Store<RootState>;
let module2048: Game2048Module;

describe('GameOver', () => {
  beforeEach(() => {
    module2048 = mock2048Module();
    store = new Vuex.Store({ modules: { '2048': module2048 } });

    module2048.state.game.score = 123;
    module2048.state.game.moves = [
      new Movement('left', 1),
      new Movement('left', 2),
      new Movement('right', 3)
    ];

    wrapper = shallowMount(GameOver, { localVue, store });
  });

  test('is a Vue component', () => {
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  test('displays final score and then number of moves', () => {
    const output = wrapper.find('.game2048__gameover > p');
    expect(output.text()).toMatch(/(.+)123(.+)3(.+)/);
  });
});
