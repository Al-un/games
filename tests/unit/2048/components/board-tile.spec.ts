import { shallowMount, Wrapper } from '@vue/test-utils';
import Vue from 'vue';

import BoardTile from '@/components/2048/BoardTile.vue';
import Tile from '@/games/2048/board/tile';

let wrapper: Wrapper<BoardTile>;
let contentWrapper: Wrapper<Vue>;
let tile: Tile;

describe('BoardTile', () => {
  describe('For any tile', () => {
    const tileVal = 32;

    beforeEach(() => {
      tile = new Tile(3, 2, 4);
      tile.val = tileVal;
      wrapper = shallowMount(BoardTile, { propsData: { tile } });
      contentWrapper = wrapper.find('div');
    });

    test('is a Vue component', () => {
      expect(wrapper.isVueInstance()).toBeTruthy();
    });

    test('display tile value', () => {
      expect(contentWrapper.text()).toEqual(tileVal.toString());
    });

    test('contains .board2048__tile class', () => {
      expect(contentWrapper.classes()).toContain('board2048__tile');
    });
  });

  describe('When tile val is <=64 >', () => {
    beforeEach(() => {
      tile = new Tile(0, 0, 0);
    });

    for (const val of [2, 4, 8, 16, 32, 64]) {
      test(`Tile has proper class for val=${val}`, () => {
        tile.val = val;
        wrapper = shallowMount(BoardTile, { propsData: { tile } });
        contentWrapper = wrapper.find('div');
        expect(contentWrapper.classes()).toContain(`board2048__tile--${val}`);
      });
    }
  });

  describe('When tile val is >=128 and <= 4096', () => {
    for (const val of [128, 256, 512, 1024, 2048, 4096]) {
      beforeEach(() => {
        tile = new Tile(0, 0, 0);
        tile.val = val;
        wrapper = shallowMount(BoardTile, { propsData: { tile } });
        contentWrapper = wrapper.find('div');
      });

      test(`Tile has .board2048__tile--128 for val=${val}`, () => {
        expect(contentWrapper.classes()).toContain(`board2048__tile--128`);
      });

      if (val >= 1024) {
        test(`Tile has .board2048__tile--1024 for val=${val}`, () => {
          expect(contentWrapper.classes()).toContain(`board2048__tile--1024`);
        });
      }
    }
  });

  describe('When tile val is >= 8192', () => {
    for (const val of [8192, 16384, 32768]) {
      beforeEach(() => {
        tile = new Tile(0, 0, 0);
        tile.val = val;
        wrapper = shallowMount(BoardTile, { propsData: { tile } });
        contentWrapper = wrapper.find('div');
      });

      test(`Tile has .board2048__tile--max for val=${val}`, () => {
        expect(contentWrapper.classes()).toContain(`board2048__tile--max`);
      });

      if (val >= 1024) {
        test(`Tile has .board2048__tile--1024 for val=${val}`, () => {
          expect(contentWrapper.classes()).toContain(`board2048__tile--1024`);
        });
      }
    }
  });
});
