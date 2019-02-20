import { createLocalVue, shallowMount, Wrapper } from '@vue/test-utils';
import VueRouter from 'vue-router';

import LayoutDefault from '@/layouts/LayoutDefault.vue';

const localVue = createLocalVue();
localVue.use(VueRouter);
const router = new VueRouter();

let wrapper: Wrapper<LayoutDefault>;

describe('LayoutDefault', () => {
  beforeEach(() => {
    wrapper = shallowMount(LayoutDefault, { localVue, router });
  });

  test('is a Vue component', () => {
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  test('has a #main-container', () => {
    const test = wrapper.find('#main-container');
    expect(test.exists()).toBeTruthy();
  });

  test('has a #main-container > #main-header', () => {
    const test = wrapper.find('#main-container > #main-header');
    expect(test.exists()).toBeTruthy();
  });
});
