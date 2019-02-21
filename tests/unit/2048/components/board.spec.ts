import { shallowMount, Wrapper, createLocalVue } from '@vue/test-utils';
import Vuex, { Store } from 'vuex';

import Board from '@/components/2048/Board.vue';
import BoardCell from '@/components/2048/BoardCell.vue';
import BoardTile from '@/components/2048/BoardTile.vue';
import { RootState } from '@/store/types';
import { mock2048Module } from '../store/store.mock';
import { Game2048Module } from '@/store/2048/types';

let wrapper: Wrapper<Board>;
let size: number;

const localVue = createLocalVue();
localVue.use(Vuex);
let store: Store<RootState>;
let module2048: Game2048Module;

describe('Board', () => {
  beforeEach(() => {
    module2048 = mock2048Module();
    size = module2048.state.game.size;

    store = new Vuex.Store({ modules: { '2048': module2048 } });
    wrapper = shallowMount(Board, { localVue, store });
  });

  test('is a Vue component', () => {
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  test('has appropriate CSS Classes', () => {
    expect(wrapper.classes()).toEqual(['board2048', `board2048--${size}`]);
  });

  test('has appropriate number of BoardCell', () => {
    const cells = wrapper.findAll(BoardCell);
    expect(cells.length).toBe(size * size);
  });

  test('has 3 BoardTiles (from mock1)', () => {
    const tiles = wrapper.findAll(BoardTile);
    expect(tiles.length).toBe(3);
  });
});
