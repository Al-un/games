import { createLocalVue, shallowMount, Wrapper, mount } from '@vue/test-utils';
import Vuex, { Store } from 'vuex';

import View2048 from '@/views/2048.vue';
import Home from '@/components/2048/Home.vue';
import Game from '@/components/2048/Game.vue';
import { RootState } from '@/store/types';
import { Game2048Module } from '@/store/2048/types';
import { mock2048Module } from '../store/store.mock';
import { GAME_STATUS } from '@/games/2048/constants';

let wrapper: Wrapper<View2048>;

const localVue = createLocalVue();
localVue.use(Vuex);
let store: Store<RootState>;
let module2048: Game2048Module;

describe('View2048', () => {
  beforeEach(() => {
    module2048 = mock2048Module();
    store = new Vuex.Store({
      modules: { '2048': module2048 }
    });
    wrapper = mount(View2048, { localVue, store });
  });

  test('is a Vue component', () => {
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  describe('Keyboard controls', () => {
    test.skip('ArrowLeft trigger "moveLeft', () => {
      const div = wrapper.find('div');
      div.trigger('keydown', { which: 37 });
      expect(module2048.actions.moveLeft).toHaveBeenCalled();
    });
  });

  describe('when game status is SELECT', () => {
    beforeEach(() => {
      module2048.state.status = GAME_STATUS.SELECT;
    });

    test('displays 2048 Home', () => {
      expect(wrapper.find(Home).exists()).toBeTruthy();
    });

    test('does not display 2048 Game', () => {
      expect(wrapper.find(Game).exists()).toBeFalsy();
    });
  });

  describe('when game status is PLAYING', () => {
    beforeEach(() => {
      module2048.state.status = GAME_STATUS.PLAYING;
    });

    test('does not display 2048 Home', () => {
      expect(wrapper.find(Home).exists()).toBeFalsy();
    });

    test('displays 2048 Game', () => {
      expect(wrapper.find(Game).exists()).toBeTruthy();
    });
  });
});
