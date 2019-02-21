import { shallowMount, Wrapper } from '@vue/test-utils';

import BoardCell from '@/components/2048/BoardCell.vue';

let wrapper: Wrapper<BoardCell>;

describe('BoardCell', () => {
  beforeEach(() => {
    wrapper = shallowMount(BoardCell);
  });

  test('is a Vue component', () => {
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  test('has a .board2048__cell and .board2048__cell--XX-YY', () => {
    const cell = wrapper.find('.board2048__cell');
    expect(cell.exists()).toBeTruthy();
    expect(cell.classes().length).toBe(2)
    expect(cell.classes()[1]).toMatch(/board2048__cell--\d{1}-\d{1}/)
  });
});
