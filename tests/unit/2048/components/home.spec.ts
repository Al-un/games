import { shallowMount, Wrapper, createLocalVue } from '@vue/test-utils';
import Vue from 'vue';
import Vuex, { Store } from 'vuex';

import Home from '@/components/2048/Home.vue';
import { RootState } from '@/store/types';
import { Game2048Module } from '@/store/2048/types';
import { mock2048Module } from '../store/store.mock';

let wrapper: Wrapper<Home>;

const localVue = createLocalVue();
localVue.use(Vuex);
let store: Store<RootState>;
let module2048: Game2048Module;

describe('Home', () => {
  beforeEach(() => {
    module2048 = mock2048Module();

    store = new Vuex.Store({ modules: { '2048': module2048 } });
    wrapper = shallowMount(Home, { localVue, store });
  });

  test('is a Vue component', () => {
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  describe('size selectors', () => {
    let increaseBtn: Wrapper<Vue>;
    let decreaseBtn: Wrapper<Vue>;

    beforeEach(() => {
      const buttons = wrapper.findAll('.format-selector > button');
      decreaseBtn = buttons.at(0);
      increaseBtn = buttons.at(1);
    });

    test('clicking left button dispatches "decreaseSize"', () => {
      decreaseBtn.trigger('click');
      expect(module2048.actions.decreaseSize).toHaveBeenCalledTimes(1);
    });

    test('clicking right button dispatches "increaseSize"', () => {
      increaseBtn.trigger('click');
      expect(module2048.actions.increaseSize).toHaveBeenCalledTimes(1);
    });
  });

  describe('game initialisation', () => {
    let newGameBtn: Wrapper<Vue>;

    beforeEach(() => {
      newGameBtn = wrapper.find('.newgame-btn');
    });

    test('clicking new game button dispatches "newGame"', () => {
      newGameBtn.trigger('click');
      expect(module2048.actions.newGame).toHaveBeenCalledTimes(1);
    });
  });
});
