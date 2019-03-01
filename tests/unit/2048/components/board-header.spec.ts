import { shallowMount, Wrapper, createLocalVue } from '@vue/test-utils';
import Vuex, { Store } from 'vuex';

import BoardHeader from '@/components/2048/BoardHeader.vue';
import { RootState } from '@/store/types';
import { mock2048Module } from '../store/store.mock';
import { Game2048Module } from '@/store/2048/types';
import { mock1 } from '../games/game/game.mock';

let wrapper: Wrapper<BoardHeader>;

const localVue = createLocalVue();
localVue.use(Vuex);
let store: Store<RootState>;
let module2048: Game2048Module;

describe('BoardHeader', () => {
  beforeEach(() => {
    module2048 = mock2048Module();
    store = new Vuex.Store({ modules: { '2048': module2048 } });
    wrapper = shallowMount(BoardHeader, { localVue, store });
  });

  test('is a Vue component', () => {
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  describe('Score', () => {
    test('has a .board__header__score', () => {
      const scoreHeader = wrapper.find('.board__header__score');
      expect(scoreHeader.exists()).toBeTruthy();
    });

    test('display score', () => {
      const scoreWrapper = wrapper
        .find('.board__header__score')
        .findAll('p')
        .at(1);
      expect(scoreWrapper.text()).toBe(mock1().score.toString());
    });

    describe('when score changes to 8', () => {
      beforeEach(() => {
        module2048.state.game.score = 8;
      });

      test('update score', () => {
        const scoreWrapper = wrapper
          .find('.board__header__score')
          .findAll('p')
          .at(1);
        expect(scoreWrapper.text()).toBe('8');
      });
    });
  });
});
