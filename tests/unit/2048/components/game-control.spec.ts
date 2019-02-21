import {
  shallowMount,
  Wrapper,
  createLocalVue,
  WrapperArray
} from '@vue/test-utils';
import Vue from 'vue';
import Vuex, { Store } from 'vuex';

import GameControl from '@/components/2048/GameControl.vue';
import { RootState } from '@/store/types';
import { Game2048Module } from '@/store/2048/types';
import { mock2048Module } from '../store/store.mock';

let wrapper: Wrapper<GameControl>;
let cancelBtn: Wrapper<Vue>;
let exitBtn: Wrapper<Vue>;

const localVue = createLocalVue();
localVue.use(Vuex);
let store: Store<RootState>;
let module2048: Game2048Module;

describe('GameControl', () => {
  beforeEach(() => {
    module2048 = mock2048Module();
    // ensure getters is now working
    module2048.getters.isCancelable = state => state.game.lastTurn.valid;
    store = new Vuex.Store({ modules: { '2048': module2048 } });

    wrapper = shallowMount(GameControl, { localVue, store });
    const buttons = wrapper.findAll('.game-control > button');
    cancelBtn = buttons.at(0);
    exitBtn = buttons.at(1);
  });

  test('is a Vue component', () => {
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  test('clicking first button triggers "cancelMove"', () => {
    cancelBtn.trigger('click');
    expect(module2048.actions.cancelMove).toBeCalledTimes(1);
  });

  test('cancelMove buttons is disabled is "isCancelable"', () => {
    expect(cancelBtn.attributes('disabled')).toBeUndefined();
    module2048.state.game.lastTurn.valid = false;
    expect(cancelBtn.attributes('disabled')).toBeDefined();
  });

  test('clicking second button triggers "exitGame"', () => {
    exitBtn.trigger('click');
    expect(module2048.actions.exitGame).toBeCalledTimes(1);
  });
});
